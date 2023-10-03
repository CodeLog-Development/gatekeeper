import { Component } from '@angular/core';
import { NotificationService } from './notification.service';

@Component({
  selector: 'root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private notificationService: NotificationService) {
    console.log(
      ' 🚀 ~ app.component.ts:11 → Notification service',
      this.notificationService,
    );
  }
}
