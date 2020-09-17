import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatFormFieldControl } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../app/shared/shared.module';
import { StorageService } from '../shared/storage/storage.service'
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  providers: [StorageService]
})
export class LoginModule { }



