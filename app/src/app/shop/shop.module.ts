import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopPageComponent } from './shop.page';
import { IonicModule } from '@ionic/angular';
import { ShopPageRoutingModule } from './shop-routing.module';
import { FormsModule } from '@angular/forms';
import { ShopService } from './shop.service';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ShopPageRoutingModule],
  providers: [ShopService],
  declarations: [ShopPageComponent],
})
export class ShopPageModule {}
