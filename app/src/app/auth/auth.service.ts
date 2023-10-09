import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, UserInfoResponse } from '@gatekeeper/api';
import { Observable, catchError, map, of, retry } from 'rxjs';
import { environment } from '../../environments/environment';
import { Token } from '@capacitor/push-notifications';

@Injectable()
export class AuthService {
  private loggedIn: boolean;
  private currentUser?: string;
  constructor(private http: HttpClient) {
    this.loggedIn = true;
    this.http
      .get<UserInfoResponse>(`${environment.apiUrl}/user/info`, {
        withCredentials: true,
        observe: 'response',
      })
      .pipe(
        catchError((_err: HttpErrorResponse) => {
          this.loggedIn = false;
          return of(undefined);
        }),
      )
      .subscribe((data) => {
        if (data?.body?.success) {
          this.loggedIn = true;
          this.currentUser = data.body.user?.username;
        }
      });
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getUserInfo(): Observable<UserInfoResponse> {
    return this.http
      .get<UserInfoResponse>(`${environment.apiUrl}/user/info`, {
        withCredentials: true,
        observe: 'response',
      })
      .pipe(
        catchError((_err: HttpErrorResponse) => {
          return of(undefined);
        }),
        map((data) => {
          return data?.body || { success: false, message: 'Not logged in' };
        }),
      );
  }

  getCurrentUser(): string | undefined {
    if (!this.currentUser) {
      this.http
        .get<UserInfoResponse>(`${environment.apiUrl}/user/info`, {
          withCredentials: true,
          observe: 'response',
        })
        .pipe(
          catchError((_err: HttpErrorResponse) => {
            this.loggedIn = false;
            return of(undefined);
          }),
        )
        .subscribe((data) => {
          if (data?.body?.success) {
            this.loggedIn = true;
            this.currentUser = data.body.user?.username;
          }
        });
    }
    return this.currentUser;
  }

  setLoggedIn(state: boolean) {
    this.loggedIn = state;
  }

  login(
    username: string,
    password: string,
  ): Observable<ApiResponse | undefined> {
    const observable = this.http
      .post<ApiResponse>(
        `${environment.apiUrl}/user/login`,
        {
          username,
          password,
        },
        {
          withCredentials: true,
          observe: 'response',
        },
      )
      .pipe(
        catchError((err: HttpErrorResponse, caught) => {
          console.log(' 🚀 ~ auth.service.ts:35 → Login failed: ', err);
          return caught;
        }),
        map((response: HttpResponse<ApiResponse>) => {
          if (!response.body) {
            return { success: false, message: 'Unkown error' };
          }

          if (response?.body?.success) {
            this.currentUser = username;
          }

          return response.body;
        }),
      );

    return observable;
  }

  register(
    username: string,
    email: string,
    password: string,
  ): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${environment.apiUrl}/user`, {
      username,
      email,
      password,
    });
  }

  setNotificationToken(token: Token): Observable<ApiResponse | undefined> {
    return this.http
      .patch<ApiResponse>(
        `${environment.apiUrl}/user/notificationToken`,
        { token: token.value },
        { observe: 'response', withCredentials: true },
      )
      .pipe(
        retry(3),
        catchError((_err: HttpErrorResponse) => {
          return of(undefined);
        }),
        map((data) => {
          return data?.body || undefined;
        }),
      );
  }
}
