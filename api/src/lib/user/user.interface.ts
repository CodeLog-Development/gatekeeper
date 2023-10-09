import { DocumentReference } from 'firebase-admin/firestore';
import { ApiResponse } from '../api.interface';

export interface ChangeTokenRequest {
  token: string;
}

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
  notificationToken?: string;
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

export interface ChangePasswordRequest {
  username: string;
  currentPassword: string;
  newPassword: string;
  confirm: string;
}

export interface UserInfoResponse extends ApiResponse {
  user?: {
    username: string;
    email: string;
    verified: boolean;
  };
}

export function validatePassword(password: string): string | undefined {
  if (password.length < 8) {
    return 'Password must be longer that 8 characters';
  }

  return undefined;
}
