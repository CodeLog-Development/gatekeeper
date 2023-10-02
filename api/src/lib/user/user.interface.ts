import { DocumentReference } from 'firebase-admin/firestore';

export interface NewUser {
  username: string;
  email: string;
  password: string;
}

export interface User {
  username: string;
  email: string;
  passwordHash: string;
  verified: boolean;
}

export interface AuthRequest {
  username: string;
  password: string;
}

export interface Cookie {
  userRef: DocumentReference;
  secret: string;
  expires: number;
}
