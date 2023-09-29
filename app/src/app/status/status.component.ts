import { Component, OnInit } from '@angular/core';
import { ServerStatusService, ServerStatus } from './server.service';

@Component({
  selector: 'gatekeeper-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusPageComponent implements OnInit {
  serverStatus?: ServerStatus;
  constructor(private statusService: ServerStatusService) {}
  ngOnInit(): void {
    this.statusService.getStatus().subscribe((data) => {
      this.serverStatus = data;
    });
  }
}
