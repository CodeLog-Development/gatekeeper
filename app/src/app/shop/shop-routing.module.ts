import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ShopPageComponent } from './shop.page';

const routes: Route[] = [
  {
    path: '',
    component: ShopPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopPageRoutingModule {}
