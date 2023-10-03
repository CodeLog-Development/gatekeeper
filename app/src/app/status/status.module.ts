import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { StatusPageComponent } from './status.component';
import { StatusPageRoutingModule } from './status-routing.module';
import { ServerStatusService } from './server.service';
import { CommonModule } from '@angular/common';
import { McStatusService } from './mc-status.service';

@NgModule({
  imports: [CommonModule, IonicModule, StatusPageRoutingModule],
  providers: [ServerStatusService, McStatusService],
  declarations: [StatusPageComponent],
  exports: [StatusPageComponent],
})
export class StatusPageModule {}
