import { ApiResponse } from '../api.interface';

export interface TokenBundle {
  bundleId: string;
  tokenAmount: number;
  zarValue: number;
}

export interface TokenBundleResponse extends ApiResponse {
  bundles?: TokenBundle[];
}
