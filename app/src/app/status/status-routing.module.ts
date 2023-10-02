import { RouterModule, Routes } from '@angular/router';
import { StatusPageComponent } from './status.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: StatusPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatusPageRoutingModule { }
