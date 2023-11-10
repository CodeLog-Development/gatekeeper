import { IsNotEmpty } from 'class-validator';
import { ApiResponse } from '../../api.interface';

export class NewTransaction {
  @IsNotEmpty()
  itemId: string;
}

export interface NewTransactionResponse extends ApiResponse {
  transactionDetails?: {
    reference: string;
    amount: number;
    customerEmail: string;
    currency: string;
  };
}

export class Transaction {
  reference: string;
  customerEmail: string;
  completed: boolean;

  constructor(partial: Partial<Transaction>) {
    Object.assign(this, partial);
  }
}
