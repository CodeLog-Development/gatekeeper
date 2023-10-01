import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'gatekeeper-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  constructor(private authService: AuthService, private router: Router) { }
  usernameChanged(event: Event) {
    console.log('🚀 ~ login.page.ts:11 → Username field commited', event);
  }

  async loginSubmit() {
    await this.authService.login();
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/');
    }
  }
}
