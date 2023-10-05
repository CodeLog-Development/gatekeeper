import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'profile-page',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss'],
})
export class ProfilePageComponent {
  isModalOpen: boolean;
  username: string;

  constructor(private authService: AuthService) {
    this.isModalOpen = false;
    this.username = this.authService.getCurrentUser() || 'Not logged in';
  }

  setModalOpen(state: boolean) {
    this.isModalOpen = state;
  }

  changePasswordClick() {
    this.setModalOpen(true);
  }
}
