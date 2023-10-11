import { Controller, Get } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { GetExchangeRateResponse } from './currency.interface';

@Controller('currency')
export class CurrencyController {
  constructor(private currencyService: CurrencyService) { }

  @Get('exchangeRate')
  async getExchangeRate(): Promise<GetExchangeRateResponse> {
    const result = await this.currencyService.getExchangeRates();
    if (!result) {
      return {
        success: false,
        message: 'Failed to query currency service for exchange rates',
      };
    }

    return {
      success: true,
      message: 'Retrieved ZAR -> EUR exchange rate',
      rate: result.data.EUR,
    };
  }
}
