import * as express from 'express';
import { User } from './user';

export interface ApiResponse {
  success: boolean;
  message: string | undefined;
}

export interface Request extends express.Request {
  user?: User;
}
