import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cookie, NewUser, User } from './user.interface';
import { FirebaseService } from '../firebase/firebase.service';
import * as argon2 from 'argon2';
import { ModuleRef } from '@nestjs/core';
import { randomBytes } from 'crypto';
import {
  CollectionReference,
  DocumentData,
  DocumentReference,
} from 'firebase-admin/firestore';

@Injectable()
export class UserService implements OnModuleInit {
  private firebaseService?: FirebaseService;
  constructor(private moduleRef: ModuleRef) { }
  onModuleInit() {
    this.firebaseService = this.moduleRef.get(FirebaseService, {
      strict: false,
    });
  }

  async setNotificationToken(userRef: DocumentReference<User>, token: string) {
    await userRef.set({ notificationToken: token }, { merge: true });
  }

  async changePassword(
    userRef: DocumentReference,
    newPassword: string,
  ): Promise<void> {
    if (!this.firebaseService) {
      throw 'No firebase provider';
    }

    await userRef.update({ passwordHash: await argon2.hash(newPassword) });
  }

  async findUserByUsername(username: string): Promise<User | undefined> {
    try {
      const ref = await this.findUserByUsernameRef(username);
      const data = await ref?.get();
      return data?.data();
    } catch (e) {
      return undefined;
    }
  }

  async findUserByUsernameRef(
    username: string,
  ): Promise<DocumentReference<User> | undefined> {
    if (!this.firebaseService) {
      throw 'No firebase connection';
    }

    const firestore = this.firebaseService?.getFirestore();
    const collection = firestore?.collection('/users');
    const result = await collection?.where('username', '==', username).get();

    console.log('🚀 ~ user.service.ts:27 → result', result?.docs.length);
    if (!result || result?.docs.length === 0) {
      return undefined;
    }

    const user: DocumentReference<User> | undefined = result?.docs.at(0)
      ?.ref as DocumentReference<User> | undefined;
    console.log(`🚀 ~ user.service.ts:33 → user: ${JSON.stringify(user)}`);
    return user;
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    if (!this.firebaseService) {
      throw 'No firebase connection';
    }

    const firestore = this.firebaseService?.getFirestore();
    const collection = firestore?.collection('/users');
    const result = await collection?.where('email', '==', email).get();
    console.log('🚀 ~ user.service.ts:45 → result', result?.docs.length);
    if (!result || result?.docs.length === 0) {
      return undefined;
    }

    const user: User | undefined = result?.docs.at(0)?.data() as User;
    console.log(`🚀 ~ user.service.ts:51 → user: ${JSON.stringify(user)}`);
    return user;
  }

  async createUser(newUser: NewUser): Promise<Cookie | undefined> {
    const { username, email, password } = newUser;
    const user: User = {
      username,
      email,
      passwordHash: await argon2.hash(password),
      verified: false,
    };

    const firestore = this.firebaseService?.getFirestore();
    const collection = firestore?.collection('/users');
    const cookies = firestore?.collection('/cookies');
    const dbUser = await collection?.add(user);

    if (!dbUser) {
      return undefined;
    }
    const newCookie: Cookie = {
      userRef: dbUser,
      secret: randomBytes(16).toString('base64'),
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    };

    try {
      await cookies?.add(newCookie);
      return newCookie;
    } catch {
      return undefined;
    }
  }

  async authenticate(
    username: string,
    password: string,
  ): Promise<Cookie | undefined> {
    const firestore = this.firebaseService?.getFirestore();
    const collection = firestore?.collection('/users');
    const users = await collection?.where('username', '==', username).get();
    if (users?.size !== 1) {
      return undefined;
    }

    let user: User | undefined;
    let userRef: DocumentReference<DocumentData> | undefined;
    users.forEach((u) => {
      user = u.data() as User;
      userRef = u.ref;
    });

    if (!user || !userRef || !user.verified) {
      return undefined;
    }

    if (await argon2.verify(user.passwordHash, password)) {
      const cookie: Cookie = {
        userRef,
        secret: randomBytes(16).toString('base64'),
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      };

      try {
        await firestore?.collection('/cookies').add(cookie);
        return cookie;
      } catch (e) {
        return undefined;
      }
    }

    return undefined;
  }

  async checkCookie(secret: string): Promise<User | undefined> {
    if (!this.firebaseService) {
      console.error('  ~ user.service.ts:153 → No firebase service present');
      return undefined;
    }

    const firestore = this.firebaseService.getFirestore();
    if (!firestore) {
      console.error('  ~ user.service.ts:153 → No firestore present');
      return undefined;
    }

    const query = await firestore
      .collection('/cookies')
      .where('secret', '==', secret)
      .where('expires', '>', Date.now())
      .get();

    if (query.docs.length !== 1) {
      return undefined;
    }

    const cookie = query.docs[0].data() as Cookie;
    const user: User | undefined = (await cookie.userRef.get()).data() as User;
    console.log(
      ' 🚀 ~ user.service.ts:175 → User associated with cookie: ',
      user,
    );
    if (!user.verified) {
      return undefined;
    }

    return user;
  }

  async getAllNotificationTokens(): Promise<string[]> {
    const firestore = this.firebaseService?.getFirestore();
    const collection = firestore?.collection('/users');
    const docs = await collection?.get();
    const tokens = [];

    for (const d of docs?.docs || []) {
      const doc = d.data() as User;
      if (doc.notificationToken) {
        tokens.push(doc.notificationToken);
      }
    }

    return tokens;
  }
}
