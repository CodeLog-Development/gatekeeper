import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProfilePageComponent } from './profile.component';
import { ProfilePageRoutingModule } from './profile-routing.module';
import { IonicModule } from '@ionic/angular';
import { ProfileService } from './profile.service';
import { ChangePasswordComponent } from './changePassword/change-password.component';

@NgModule({
  imports: [IonicModule, CommonModule, ProfilePageRoutingModule],
  providers: [ProfileService],
  declarations: [ProfilePageComponent, ChangePasswordComponent],
  exports: [ProfilePageComponent],
})
export class ProfilePageModule { }
