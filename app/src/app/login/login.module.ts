import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginPage } from './login.page';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    IonicModule,
    RouterModule.forChild([{ path: '', component: LoginPage }]),
  ],
  declarations: [LoginPage],
  exports: [RouterModule],
})
export class LoginPageModule { }
