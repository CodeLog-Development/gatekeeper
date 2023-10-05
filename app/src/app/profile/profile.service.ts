import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, ChangePasswordRequest } from '@gatekeeper/api';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class ProfileService {
  constructor(private http: HttpClient) { }

  changePassword(
    username: string,
    currentPassword: string,
    newPassword: string,
    confirm: string,
  ): Observable<ApiResponse> {
    const req: ChangePasswordRequest = {
      username,
      currentPassword,
      newPassword,
      confirm,
    };

    return this.http
      .patch<ApiResponse | undefined>(
        `${environment.apiUrl}/user/password`,
        req,
        {
          observe: 'response',
        },
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          console.log(
            ' 🚀 ~ profile.service.ts:36 → Failed to change user password',
            err,
          );

          return of(undefined);
        }),
        map((data: HttpResponse<ApiResponse | undefined> | undefined) => {
          if (!data?.body) {
            return { success: false, message: 'An unknown error occurred' };
          }
          return data.body;
        }),
      );
  }
}
