import { Injectable } from '@nestjs/common';
import { Firestore, getFirestore } from 'firebase-admin/firestore';
import { credential } from 'firebase-admin';
import { ServiceAccount, initializeApp } from 'firebase-admin/app';
import { ConfigService } from '@nestjs/config';
import { GatekeeperNotification } from './notification.interface';
import {
  ConditionMessage,
  getMessaging,
  Messaging,
  TopicMessage,
} from 'firebase-admin/messaging';
import { UserService } from '../user/user.service';

@Injectable()
export class FirebaseService {
  private readonly firestore?: Firestore;
  private readonly messaging?: Messaging;

  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {
    const serviceAccount =
      this.configService.get<ServiceAccount>('serviceAccount');

    if (!serviceAccount) {
      throw "Couldn't load firebase credentials";
    }

    try {
      const app = initializeApp({
        credential: credential.cert(serviceAccount),
      });
      this.firestore = getFirestore(app);
      this.messaging = getMessaging(app);
    } catch (e) {
      console.info('Firebase app already initialized');
    }
  }

  getFirestore(): Firestore | undefined {
    return this.firestore;
  }

  async sendNotification(
    notification: GatekeeperNotification,
  ): Promise<boolean> {
    try {
      const tokens: string[] =
        await this.userService.getAllNotificationTokens();

      await this.messaging?.sendEachForMulticast({
        tokens,
        notification: {
          title: notification.title,
          body: notification.message,
        },
      });

      return true;
    } catch (_e) {
      return false;
    }
  }
}
