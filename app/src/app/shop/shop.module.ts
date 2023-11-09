import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopPageComponent } from './shop.page';
import { IonicModule } from '@ionic/angular';
import { ShopPageRoutingModule } from './shop-routing.module';
import { FormsModule } from '@angular/forms';
import { ShopService } from './shop.service';
import { Angular4PaystackModule } from 'angular4-paystack';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShopPageRoutingModule,
    Angular4PaystackModule,
  ],
  providers: [ShopService],
  declarations: [ShopPageComponent],
})
export class ShopPageModule { }
