import { Component, EventEmitter, Output } from '@angular/core';
import { ProfileService } from '../profile.service';
import {
  AlertController,
  InputChangeEventDetail,
  InputCustomEvent,
} from '@ionic/angular';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'gatekeeper-change-password',
  templateUrl: 'change-password.component.html',
  styleUrls: ['change-password.component.scss'],
})
export class ChangePasswordComponent {
  @Output() shouldClose = new EventEmitter<boolean>();
  currentPassword: string;
  newPassword: string;
  confirm: string;
  toastMessage: string = '';
  isToastOpen: boolean = false;

  constructor(
    private profileService: ProfileService,
    private alertController: AlertController,
    private authService: AuthService,
  ) {
    this.currentPassword = '';
    this.newPassword = '';
    this.confirm = '';
  }

  currentPasswordChange(event: Event) {
    const customEvent = event as InputCustomEvent<InputChangeEventDetail>;
    this.currentPassword = customEvent.detail.value || '';
  }

  newPasswordChange(event: Event) {
    const customEvent = event as InputCustomEvent<InputChangeEventDetail>;
    this.newPassword = customEvent.detail.value || '';
  }
  confirmPasswordChange(event: Event) {
    const customEvent = event as InputCustomEvent<InputChangeEventDetail>;
    this.confirm = customEvent.detail.value || '';
  }

  close() {
    this.shouldClose.emit(true);
  }

  setToastOpen(state: boolean) {
    this.isToastOpen = state;
  }

  submit() {
    const username = this.authService.getCurrentUser();
    if (username === undefined) {
      this.toastMessage = 'Not logged in';
      this.setToastOpen(true);
    }

    this.profileService
      .changePassword(
        username || '',
        this.currentPassword,
        this.newPassword,
        this.confirm,
      )
      .subscribe((data) => {
        if (data.success) {
          this.alertController
            .create({
              header: 'Success',
              message: 'Password updated',
              buttons: ['OK'],
            })
            .then((alert) => {
              alert.present().then(() => console.log('Alert presented'));
              alert.onDidDismiss().then(() => console.log('Alert dismissed'));
            });
        } else {
          this.toastMessage = data.message || "Couldn't change password";
          this.setToastOpen(true);
        }
      });
  }
}
