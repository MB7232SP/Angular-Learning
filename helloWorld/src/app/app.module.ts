import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HomepagePage } from '../pages/homepage/homepage';
import { CategariesPage } from '../pages/categaries/categaries';
import { ImageCardComponent } from '../components/image-card/image-card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx/index'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    HomepagePage,
    CategariesPage,
    ImageCardComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    HomepagePage,
    CategariesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiService,
    AndroidPermissions
  ]
})
export class AppModule {}
