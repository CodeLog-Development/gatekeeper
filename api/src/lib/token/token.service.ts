import { Injectable } from '@nestjs/common';
import { TokenBundle } from './token.interface';

@Injectable()
export class TokenService {
  async getTokenBundles(): Promise<TokenBundle[]> {
    return [{ bundleId: '100', tokenAmount: 100, zarValue: 99.99 }];
  }
}
