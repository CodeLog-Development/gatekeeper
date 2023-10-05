import { NgModule } from '@angular/core';
import { ProfilePageComponent } from './profile.component';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: '',
    component: ProfilePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule { }
