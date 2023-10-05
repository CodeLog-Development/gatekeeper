import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, retry } from 'rxjs';

export interface McStatus {
  online: boolean;
  ip: string;
  port: string;
  hostname: string;
  version: string;
  protocol: {
    version: number;
    name: string;
  };
  icon: string;
  players: PlayerList;
}

export interface PlayerList {
  online: number;
  max: number;
  list: { name: string; uuid: string }[];
}

@Injectable()
export class McStatusService {
  constructor(private http: HttpClient) {}

  getPlayers(ip: string): Observable<PlayerList | undefined> {
    return this.http
      .get<McStatus>(`https://api.mcsrvstat.us/3/${ip}`, {
        observe: 'response',
      })
      .pipe(
        retry(3),
        catchError((_err: HttpErrorResponse) => {
          return of(undefined);
        }),
        map((res: HttpResponse<McStatus> | undefined) => {
          return res?.body?.players || undefined;
        }),
      );
  }
}
