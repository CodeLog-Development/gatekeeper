import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from '@angular/common';
import { StatusPageModule } from './status/status.module';
import { NotificationService } from './notification.service';
import { environment } from '../environments/environment';
import { Angular4PaystackModule } from 'angular4-paystack';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    StatusPageModule,
    AuthModule,
    IonicModule.forRoot(),
    Angular4PaystackModule.forRoot(environment.paystackPublicKey),
  ],
  providers: [
    NotificationService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
