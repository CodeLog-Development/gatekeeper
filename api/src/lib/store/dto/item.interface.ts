import { ApiResponse } from '../../api.interface';

export class StoreItem {
  id: string;
  price: number;
  name: string;
  description: string;
}

export interface StoreItemResponse extends ApiResponse {
  items?: StoreItem[];
}
