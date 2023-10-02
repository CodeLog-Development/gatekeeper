import { Component, OnInit } from '@angular/core';
import { ServerStatusService, ServerStatus } from './server.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { catchError, map, of, retry } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { RefresherCustomEvent, RefresherEventDetail } from '@ionic/angular';

@Component({
  selector: 'gatekeeper-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusPageComponent implements OnInit {
  serverStatus?: ServerStatus;
  isToastOpen: boolean;
  toastMessage: string;

  constructor(
    private statusService: ServerStatusService,
    private authService: AuthService,
    private router: Router
  ) {
    this.isToastOpen = false;
    this.toastMessage = '';
  }

  setToastOpen(state: boolean) {
    this.isToastOpen = state;
  }

  refresh(event: Event | undefined) {
    const customEvent = event as RefresherCustomEvent;
    this.statusService
      .getStatus()
      .pipe(
        retry(3),
        catchError((err: HttpErrorResponse) => {
          customEvent.target.complete();
          if (err.status === 401) {
            this.authService.setLoggedIn(false);
            this.router.navigateByUrl('/login');
          }
          return of(undefined);
        }),
        map((result) => {
          return result?.body;
        })
      )
      .subscribe((data) => {
        console.log('🚀 ~ status.component.ts:14', data);
        this.serverStatus = data || undefined;

        if (customEvent !== undefined) {
          customEvent.target.complete();
        }
      });
  }

  ngOnInit(): void {
    this.refresh(undefined);
  }

  isRunning(): boolean {
    return (
      (this.serverStatus?.running || []).findIndex(
        (instance) => instance === 'i-0e090ccbade9245ee'
      ) != -1
    );
  }

  startServerClick(_event: any) {
    this.statusService.startServer('i-0e090ccbade9245ee').subscribe((data) => {
      if (data?.success) {
        data?.started?.forEach((i) => this.serverStatus?.running?.push(i));
      } else {
        this.toastMessage = 'Failed to start server';
        this.isToastOpen = true;
      }
    });
  }

  stopServerClick(_event: any) {
    this.statusService.stopServer('i-0e090ccbade9245ee').subscribe((data) => {
      if (data?.success) {
        if (this.serverStatus !== undefined) {
          const oldRunning = this.serverStatus.running;
          const newRunning: string[] = [];
          oldRunning?.forEach((i) => {
            if (data?.stopped?.findIndex((x) => x === i) === -1) {
              newRunning.push(i);
            }
          });
          this.serverStatus.running = newRunning;
        }
      } else {
        this.toastMessage = 'Failed to stop server';
        this.isToastOpen = true;
      }
    });
  }
}
