import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { StatusPageComponent } from './status.component';
import { StatusPageRoutingModule } from './status-routing.module';
import { ServerStatusService } from './server.service';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, IonicModule, StatusPageRoutingModule],
  providers: [ServerStatusService],
  declarations: [StatusPageComponent],
  exports: [StatusPageComponent],
})
export class StatusPageModule { }
