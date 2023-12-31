import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import {
  LoadingController,
  InputChangeEventDetail,
  InputCustomEvent,
  AlertController,
} from '@ionic/angular';
import { catchError, of } from 'rxjs';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'gatekeeper-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  private username: string;
  private password: string;
  private email: string;
  isToastOpen: boolean;
  toastMessage: string;
  isModalOpen: boolean;

  constructor(
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private notificationService: NotificationService,
  ) {
    this.username = '';
    this.password = '';
    this.email = '';
    this.isToastOpen = false;
    this.toastMessage = '';
    this.isModalOpen = false;
  }
  usernameChanged(event: Event) {
    const customEvent = event as InputCustomEvent<InputChangeEventDetail>;
    console.log(
      '🚀 ~ login.page.ts:11 → Username field commited. New value: ',
      customEvent.detail.value,
    );
    this.username = customEvent.detail.value || '';
  }

  emailChanged(event: Event) {
    const customEvent = event as InputCustomEvent<InputChangeEventDetail>;
    this.email = customEvent.detail.value || '';
  }

  passwordChanged(event: Event) {
    const customEvent = event as InputCustomEvent<InputChangeEventDetail>;
    this.password = customEvent.detail.value || '';
  }

  async loginSubmit() {
    const loading = await this.loadingCtrl.create({
      message: 'Logging in...',
    });

    loading.present();

    const sub = this.authService
      .login(this.username, this.password)
      .subscribe((data) => {
        sub.unsubscribe();
        if (data?.success) {
          this.authService.setLoggedIn(true);
          loading.dismiss();

          if (this.notificationService.isRegistered()) {
            const sub = this.authService
              .setNotificationToken(this.notificationService.getToken())
              .subscribe((data) => {
                sub.unsubscribe();
                if (data?.success) {
                  console.log(' 🚀 ~ login.page.ts → Notifications subscribed');
                }
              });
          }

          this.router.navigateByUrl('/tabs/status');
        } else {
          loading.dismiss();
          this.isToastOpen = true;
          this.toastMessage = data?.message || 'An unkown error occurred';
        }
      });
  }

  registerSubmit() {
    const sub = this.authService
      .register(this.username, this.email, this.password)
      .pipe(
        catchError(() => {
          return of(undefined);
        }),
      )
      .subscribe((data) => {
        sub.unsubscribe();
        if (data?.success || false) {
          this.alertController
            .create({
              message: 'User registered',
            })
            .then(() => {
              this.setModalOpen(false);
            });
        } else {
          this.toastMessage = data?.message || 'An unkown error occurred';
          this.setOpen(true);
        }
      });
  }

  setModalOpen(state: boolean) {
    this.isModalOpen = state;
  }

  setOpen(state: boolean) {
    this.isToastOpen = state;
  }
}
