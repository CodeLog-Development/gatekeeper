import { Component, OnInit } from '@angular/core';
import { ServerStatusService, ServerStatus } from './server.service';

@Component({
  selector: 'gatekeeper-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusPageComponent implements OnInit {
  serverStatus?: ServerStatus;
  constructor(private statusService: ServerStatusService) { }
  ngOnInit(): void {
    this.statusService.getStatus().subscribe((data) => {
      console.log('🚀 ~ status.component.ts:14', data);
      this.serverStatus = data;
    });
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
      if (data.success) {
        data?.started?.forEach((i) => this.serverStatus?.running?.push(i));
      }
    });
  }

  stopServerClick(_event: any) {
    this.statusService.stopServer('i-0e090ccbade9245ee').subscribe((data) => {
      if (data.success) {
        if (this.serverStatus !== undefined) {
          const oldRunning = this.serverStatus.running;
          const newRunning: string[] = [];
          oldRunning?.forEach((i) => {
            if (data.stopped?.findIndex((x) => x === i) === -1) {
              newRunning.push(i);
            }
          });
          this.serverStatus.running = newRunning;
        }
      }
    });
  }
}
