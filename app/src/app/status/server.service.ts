import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface ServerStatus {
  status: boolean;
  message: string;
  running: boolean;
}

@Injectable()
export class ServerStatusService {
  constructor(private http: HttpClient) {}

  getStatus() {
    return this.http.get<ServerStatus>('/api/server/status');
  }
}
