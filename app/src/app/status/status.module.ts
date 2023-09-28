import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { StatusPage } from './status.page';
import { StatusPageRoutingModule } from './status-routing.module';

@NgModule({
  imports: [CommonModule, IonicModule, StatusPageRoutingModule],
  declarations: [StatusPage],
})
export class StatusPageModule {}
