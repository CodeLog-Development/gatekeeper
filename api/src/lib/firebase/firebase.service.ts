import { Injectable } from '@nestjs/common';
import { Firestore, getFirestore } from 'firebase-admin/firestore';
import { credential } from 'firebase-admin';
import { ServiceAccount, initializeApp } from 'firebase-admin/app';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirebaseService {
  private readonly firestore?: Firestore;
  constructor(private configService: ConfigService) {
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
    } catch (e) {
      console.info('Firebase app already initialized');
    }
  }

  getFirestore(): Firestore | undefined {
    return this.firestore;
  }
}
