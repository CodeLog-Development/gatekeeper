import { ApiResponse } from '../api.interface';

export interface StartInstanceRequest {
  instanceId: string;
}

export interface StartServerResponse extends ApiResponse {
  started?: string[];
}

export interface StopServerRequest {
  instanceId: string;
}

export interface StopServerResponse extends ApiResponse {
  stopped?: string[];
}
