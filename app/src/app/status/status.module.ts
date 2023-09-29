import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { StatusPageComponent } from './status.component';
import { StatusPageRoutingModule } from './status-routing.module';

@NgModule({
  imports: [IonicModule, StatusPageRoutingModule],
  declarations: [StatusPageComponent],
  exports: [StatusPageComponent],
})
export class StatusPageModule { }
