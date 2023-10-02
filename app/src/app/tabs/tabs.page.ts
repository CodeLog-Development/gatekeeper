import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'gatekeeper-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    setTimeout(() => {
      if (!this.authService.isLoggedIn()) {
        this.router.navigate(['../login']);
      }
    });
  }

  async startServer(): Promise<void> { }
}
