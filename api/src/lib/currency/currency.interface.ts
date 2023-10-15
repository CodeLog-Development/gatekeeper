import { ApiResponse } from '../api.interface';

export interface CurrencyApiResponse {
  meta: {
    last_updated_at: string;
  };
  data: {
    EUR: number;
  };
}

export interface GetExchangeRateResponse extends ApiResponse {
  rate?: number;
}
