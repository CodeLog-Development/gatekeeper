import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cookie, NewUser, User } from './user.interface';
import { FirebaseService } from '../firebase/firebase.service';
import * as argon2 from 'argon2';
import { ModuleRef } from '@nestjs/core';
import { randomBytes } from 'crypto';

@Injectable()
export class UserService implements OnModuleInit {
  private firebaseService?: FirebaseService;
  constructor(private moduleRef: ModuleRef) { }
  onModuleInit() {
    this.firebaseService = this.moduleRef.get(FirebaseService, {
      strict: false,
    });
  }

  async createUser(newUser: NewUser): Promise<Cookie | undefined> {
    const { username, email, password } = newUser;
    const user: User = {
      username,
      email,
      passwordHash: await argon2.hash(password),
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
}
