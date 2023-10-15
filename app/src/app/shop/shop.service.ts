import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, retry } from 'rxjs';
import {
  GetExchangeRateResponse,
  TokenBundleResponse,
  TokenBundle,
} from '@gatekeeper/api';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class ShopService {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  getTokenBundles(): Observable<TokenBundle[]> {
    // TODO: Retrieve token bundles from server
    return this.http
      .get<TokenBundleResponse>(`${environment.apiUrl}/token/bundles`, {
        observe: 'response',
      })
      .pipe(
        retry(3),
        catchError((err: HttpErrorResponse) => {
          console.error(
            ' 🚀 ~ shop.service.ts → Failed to query server for token bundles',
            err,
          );
          return of(undefined);
        }),
        map((data) => {
          if (data?.body?.success) {
            return data?.body?.bundles || [];
          } else {
            return [];
          }
        }),
      );
  }

  getExchangeRate(): Observable<GetExchangeRateResponse | undefined> {
    return this.http
      .get<GetExchangeRateResponse>(
        `${environment.apiUrl}/currency/exchangeRate`,
        { observe: 'response', withCredentials: true },
      )
      .pipe(
        retry(3),
        catchError((err: HttpErrorResponse) => {
          console.error(
            ' 🚀 ~ shop.service.ts → Failed to query server for exchange rates',
            err,
          );
          if (err.status === 401) {
            this.router.navigateByUrl('/login');
          }
          return of(undefined);
        }),
        map((data) => {
          return data?.body || undefined;
        }),
      );
  }
}
