import { IsDateString, IsIP, IsObject, ValidateNested } from 'class-validator';

export type PaystackEvent = ChargeSuccess;

export class ChargeSuccess {
  event: 'charge.success';
  @ValidateNested()
  data: ChargeSuccessData;
}

export class ChargeSuccessData {
  id: number;
  domain: string;
  status: string;
  reference: string;
  amount: number;
  message?: string;
  gateway_response: string;

  @IsDateString()
  paid_at: string;

  @IsDateString()
  created_at: string;

  channel: string;
  currency: string;

  @IsIP()
  ip_address: string;

  metadata: unknown;
  log: unknown;
  fees?: unknown;
  customer: unknown;
  authorization: unknown;

  @IsObject()
  plan: unknown;
}
