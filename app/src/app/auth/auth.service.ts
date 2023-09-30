import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  private loggedIn: boolean;
  constructor() {
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  async login(): Promise<boolean> {
    this.loggedIn = true;
    return true;
  }
}
