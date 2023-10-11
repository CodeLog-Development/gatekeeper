import { Controller, Get } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenBundleResponse } from './token.interface';

@Controller('token')
export class TokenController {
  constructor(private tokenService: TokenService) { }

  @Get('bundles')
  async getTokenBundles(): Promise<TokenBundleResponse> {
    const bundles = await this.tokenService.getTokenBundles();
    return { success: true, message: 'Retrieved token bundles', bundles };
  }
}
