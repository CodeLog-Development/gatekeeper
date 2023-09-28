import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TabsPage } from './tabs.page';

import { TabsPageRoutingModule } from './tabs-routing.module';
import { StatusPage } from '../status/status.page';

@NgModule({
  imports: [
    CommonModule,
    StatusPage,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule,
  ],
  declarations: [TabsPage],
})
export class TabsPageModule {}
