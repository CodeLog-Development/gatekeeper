import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TabsPage } from './tabs.page';

import { TabsPageRoutingModule } from './tabs-routing.module';
import { StatusPage } from '../status/status.page';
import { StatusPageModule } from '../status/status.module';

@NgModule({
  imports: [
    CommonModule,
    StatusPageModule,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule,
  ],
  declarations: [TabsPage],
})
export class TabsPageModule { }
