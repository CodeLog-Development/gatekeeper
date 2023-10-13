import { Injectable } from '@nestjs/common';
import { TokenBundle } from './token.interface';

@Injectable()
export class TokenService {
  async getTokenBundles(): Promise<TokenBundle[]> {
    return [{ bundleId: '10', tokenAmount: 10, zarValue: 99.99 }];
  }
}
