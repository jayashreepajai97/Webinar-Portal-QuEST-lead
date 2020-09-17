import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './http.service';
import { BrowserModule } from '@angular/platform-browser';
// import {JwtInterceptor} from './jwt.interceptor';
// import { StorageComponent } from './storage/storage.component';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    // JwtInterceptor

  ],
  providers: [
    HttpService,

  ]
})
export class SharedModule { }
