import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@gatekeeper/api';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { ToastController } from '@ionic/angular';

@Injectable()
export class AuthService {
  private loggedIn: boolean;
  constructor(
    private http: HttpClient,
    private toastController: ToastController
  ) {
    this.loggedIn = true;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  setLoggedIn(state: boolean) {
    this.loggedIn = state;
  }

  login(username: string, password: string): Observable<ApiResponse> {
    const observable = this.http.post<ApiResponse>(
      `${environment.apiUrl}/user/login`,
      {
        username,
        password,
      },
      {
        withCredentials: true,
      }
    );

    return observable;
  }

  register(
    username: string,
    email: string,
    password: string
  ): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      `${environment.apiUrl}/user`,
      { username, email, password },
      { withCredentials: true }
    );
  }
}
