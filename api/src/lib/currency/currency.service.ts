import { Injectable } from '@nestjs/common';
import { CurrencyApiResponse } from './currency.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CurrencyService {
  constructor(private configService: ConfigService) { }

  async getExchangeRates(): Promise<CurrencyApiResponse | undefined> {
    const apiKey: { apiKey: string } | undefined =
      this.configService.get('currencyApiKey');
    if (!apiKey) {
      return undefined;
    }

    try {
      const res = await fetch(
        `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey.apiKey}&base_currency=ZAR&currencies=EUR`,
      );
      const json: CurrencyApiResponse = await res.json();
      return json;
    } catch (e) {
      console.error(
        ' 🚀 ~ currency.service.ts → Failed to query currency api',
        e,
      );
      return undefined;
    }
  }
}
