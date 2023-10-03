import { NgModule } from '@angular/core';
import { TabsPage } from './tabs.page';
import { TabsPageRoutingModule } from './tabs-routing.module';
import { StatusPageModule } from '../status/status.module';
import { IonicModule } from '@ionic/angular';
import { ProfilePageModule } from '../profile/profile.module';

@NgModule({
  imports: [
    IonicModule,
    ProfilePageModule,
    StatusPageModule,
    TabsPageRoutingModule,
  ],
  declarations: [TabsPage],
  exports: [TabsPage],
})
export class TabsPageModule { }
