import { Component, OnInit } from '@angular/core';
import { ServerStatusService, ServerStatus } from './server.service';
import { RefresherCustomEvent } from '@ionic/angular';
import { McStatusService, PlayerList } from './mc-status.service';
import { InstanceInfo } from '@gatekeeper/api';

@Component({
  selector: 'gatekeeper-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusPageComponent implements OnInit {
  serverStatus?: ServerStatus;
  isToastOpen: boolean;
  toastMessage: string;
  isPopoverOpen: boolean;
  popoverIp = '';
  playerList: Map<string, PlayerList> = new Map([]);
  refreshing = true;
  instanceList?: InstanceInfo[];

  constructor(
    private statusService: ServerStatusService,
    private mcService: McStatusService,
  ) {
    this.isToastOpen = false;
    this.toastMessage = '';
    this.isPopoverOpen = false;
  }

  setToastOpen(state: boolean) {
    this.isToastOpen = state;
  }

  viewPlayerList(ip: string) {
    this.popoverIp = ip;
    this.setPopoverOpen(true);
  }

  setPopoverOpen(state: boolean) {
    this.isPopoverOpen = state;
  }

  refresh(event: Event | undefined) {
    this.refreshing = true;
    this.playerList = new Map([]);
    const customEvent: RefresherCustomEvent | undefined = event as
      | RefresherCustomEvent
      | undefined;

    const instanceSub = this.statusService.getInstances().subscribe((data) => {
      if (data?.success) {
        this.instanceList = data.instances || [];

        const sub = this.statusService.getStatus().subscribe((data) => {
          console.log('🚀 ~ status.component.ts:14', data);
          this.serverStatus = data || undefined;

          if (customEvent !== undefined) {
            customEvent.target.complete();
          }

          this.refreshing = false;
          sub.unsubscribe();
          instanceSub.unsubscribe();

          for (const instance of this.instanceList || []) {
            for (const server of instance.servers) {
              const mcSub = this.mcService
                .getPlayers(server.ip)
                .subscribe((data) => {
                  console.log(
                    ' 🚀 ~ status.component.ts:72 → playerList',
                    data,
                  );

                  if (data) {
                    this.playerList.set(server.ip, data);
                  }

                  mcSub.unsubscribe();
                });
            }
          }
        });
      } else {
        console.error(
          ' 🚀 status.component.ts → Failed to fetch server info',
          data?.message,
        );
        instanceSub.unsubscribe();
      }
    });
  }

  ngOnInit(): void {
    this.refresh(undefined);
    this.statusService.statusObserver(10000).subscribe((statusResponse) => {
      if (!this.serverStatus) {
        this.serverStatus = { success: true, message: '' };
      }

      if (statusResponse?.success) {
        this.serverStatus.running = [];
        statusResponse.running?.forEach(
          (i) => this.serverStatus?.running?.push(i),
        );
      }
    });
  }

  isRunning(id: string): boolean {
    return (
      (this.serverStatus?.running || []).findIndex(
        (instance) => instance === id,
      ) != -1
    );
  }

  startServerClick(id: string) {
    this.statusService.startServer(id).subscribe((data) => {
      if (data?.success) {
        data?.started?.forEach((i) => this.serverStatus?.running?.push(i));
      } else {
        this.toastMessage = 'Failed to start server';
        this.isToastOpen = true;
      }
    });
  }

  stopServerClick(id: string) {
    this.statusService.stopServer(id).subscribe((data) => {
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
