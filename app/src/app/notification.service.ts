import { Injectable } from '@angular/core';
import { PushNotifications, Token } from '@capacitor/push-notifications';

@Injectable()
export class NotificationService {
  private static registered = false;
  private static regToken: Token;

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
        ' 🚀 ~ notification.service.ts → Caught exception registering for notifications:',
        e,
      );
      console.info(
        ' 🚀 ~ notification.service.ts → Not a bug! We are most likely in a web browser, not native',
      );
    }
  }

  private static async addListeners() {
    try {
      await PushNotifications.addListener('registration', (token) => {
        console.info(
          ' 🚀 ~ notification.service.ts:23 → Registered for push notifications:',
          token,
        );
        NotificationService.registered = true;
        NotificationService.regToken = token;
      });

      await PushNotifications.addListener('registrationError', (err) => {
        console.warn(
          ' 🚀 ~ notification.service.ts:31 → Push notification registration error:',
          err,
        );
      });

      await PushNotifications.addListener(
        'pushNotificationReceived',
        (notification) => {
          console.log(
            ' 🚀 ~ notification.service.ts:38 → Notification received:',
            notification,
          );
        },
      );
    } catch (e) {
      console.warn(
        ' 🚀 ~ notification.service.ts → Caught exception registering notification listeners:',
        e,
      );
    }
  }

  getToken(): Token {
    return NotificationService.regToken;
  }
}
