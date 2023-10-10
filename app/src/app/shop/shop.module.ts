import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopPageComponent } from './shop.page';
import { IonicModule } from '@ionic/angular';
import { ShopPageRoutingModule } from './shop-routing.module';

@NgModule({
  imports: [CommonModule, IonicModule, ShopPageRoutingModule],
  declarations: [ShopPageComponent],
})
export class ShopPageModule {}
