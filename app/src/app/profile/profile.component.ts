import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'profile-page',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  isModalOpen: boolean;
  username: string;

  constructor(private authService: AuthService) {
    this.isModalOpen = false;
    this.username = 'Not logged in';
  }

  ngOnInit() {
    this.authService.getUserInfo().subscribe((data) => {
      if (data.success) {
        this.username = data.user?.username || 'Not logged in';
      } else {
        console.log('Failed to query user profile');
      }
    });
  }

  setModalOpen(state: boolean) {
    this.isModalOpen = state;
  }

  changePasswordClick() {
    this.setModalOpen(true);
  }
}
