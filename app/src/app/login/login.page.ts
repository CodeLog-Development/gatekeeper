import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import {
  LoadingController,
  InputChangeEventDetail,
  InputCustomEvent,
} from '@ionic/angular';

@Component({
  selector: 'gatekeeper-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  private username: string;
  private password: string;
  isToastOpen: boolean;
  toastMessage: string;

  constructor(
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private router: Router
  ) {
    this.username = '';
    this.password = '';
    this.isToastOpen = false;
    this.toastMessage = '';
  }
  usernameChanged(event: Event) {
    const customEvent = event as InputCustomEvent<InputChangeEventDetail>;
    console.log(
      '🚀 ~ login.page.ts:11 → Username field commited. New value: ',
      customEvent.detail.value
    );
    this.username = customEvent.detail.value || '';
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

    this.authService.login(this.username, this.password).subscribe((data) => {
      if (data.success) {
        this.authService.setLoggedIn(true);
        loading.dismiss();
        this.router.navigateByUrl('/tabs/status');
      } else {
        loading.dismiss();
        this.isToastOpen = true;
        this.toastMessage = data.message || 'An unkown error occurred';
      }
    });
  }

  setOpen(state: boolean) {
    this.isToastOpen = state;
  }
}
