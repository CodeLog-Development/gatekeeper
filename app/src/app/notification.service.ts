import { Injectable } from '@angular/core';
import { PushNotifications } from '@capacitor/push-notifications';

@Injectable()
export class NotificationService {
  private static registered = false;

  constructor() {
    if (!NotificationService.registered) {
      NotificationService.addListeners();
      NotificationService.registerNotifications();
    }
  }

  isRegistered(): boolean {
    return NotificationService.registered;
  }

  private static async registerNotifications() {
    try {
      let permStatus = await PushNotifications.checkPermissions();
      if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions();
      }

      if (permStatus.receive === 'granted') {
        await PushNotifications.register();
      } else {
        console.warn(
          ' 🚀 ~ notification.service.ts:31 → User denied notification perms',
        );
      }
    } catch (e) {
      console.warn(
        ' 🚀 ~ notification.service.ts:31 → Failed to register for push notifications',
        e,
      );
    }
  }

  private static async addListeners() {
    try {
      await PushNotifications.addListener('registration', (token) => {
        console.info(
          ' 🚀 ~ notification.service.ts:23 → Registered for push notifications',
          token,
        );
        NotificationService.registered = true;
      });

      await PushNotifications.addListener('registrationError', (err) => {
        console.warn(
          ' 🚀 ~ notification.service.ts:31 → Push notification registration error',
          err,
        );
      });

      await PushNotifications.addListener(
        'pushNotificationReceived',
        (notification) => {
          console.log(
            ' 🚀 ~ notification.service.ts:38 → Notification received',
            notification,
          );
        },
      );
    } catch (e) {
      console.warn(
        ' 🚀 ~ notification.service.ts → Failed to register notification listeners',
        e,
      );
    }
  }
}
