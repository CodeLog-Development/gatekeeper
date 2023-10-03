import { Injectable } from '@angular/core';
import { PushNotifications } from '@capacitor/push-notifications';

@Injectable()
export class NotificationService {
  constructor() {
    PushNotifications.register()
      .then(() => {
        console.log(
          ' 🚀 ~ notification.service.ts:8 → App registered for notifications!',
        );
      })
      .catch((err) => {
        console.error(
          ' 🚀 ~ notification.service.ts:12 → Unable to register for notifications',
          err,
        );
      });
  }
}
