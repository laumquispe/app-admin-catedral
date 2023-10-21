import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularTokenModule } from 'angular-token';
import { environment } from 'src/environments/environment';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import {  NgxUiLoaderConfig} from "ngx-ui-loader";
import { NavbarComponent } from './modules/navbar/navbar.component';
import { NavbarModule } from '@module/navbar/navbar.module';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '@core/core.module';



const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor : "#3a6dbc",
   bgsOpacity :  0.5,
   bgsPosition : "bottom-right",
   bgsSize : 80,
   bgsType : "ball-spin-clockwise",
   blur : 5,
   delay: 0,
   fastFadeOut : true,
   fgsColor : "#3a6dbc",
   fgsPosition : "center-center",
   fgsSize : 60,
   fgsType : "chasing-dots",
   gap : 24,
   logoPosition : "center-center",
   logoSize : 120,
   logoUrl : "",
   masterLoaderId : "master",
   overlayBorderRadius : "0",
   overlayColor : "rgba(40, 40, 40, 0.8)",
   pbColor : "#3a6dbc",
   pbDirection : "ltr",
   pbThickness : 3,
   hasProgressBar : true,
   text : "Cargando Datos...",
   textColor : "#FFFFFF",
   textPosition : "center-center",
   maxTime : -1,
   minTime : 500
};
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule, 
    CoreModule,    
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),  
    NavbarModule,
    AngularTokenModule.forRoot({
      apiBase:                     environment.baseUrl,
         apiPath:                   '',

         signInPath:                 'auth/sign_in',
         signInRedirect:             'login',
         signInStoredUrlStorageKey:  'login',

         signOutPath:                'auth/sign_out',
         validateTokenPath:          'auth/validate_token',
         signOutFailedValidate:      false,

         registerAccountPath:        'auth',
         deleteAccountPath:          'auth',
         registerAccountCallback:    window.location.href,

         updatePasswordPath:         'auth',
         resetPasswordPath:          'auth/password',
         resetPasswordCallback:      window.location.href,

         userTypes:                 [],
         loginField:                'nickname',

  })
  ],
  providers: [
    AngularTokenModule  
  ],  
  bootstrap: [AppComponent]
})
export class AppModule { }
