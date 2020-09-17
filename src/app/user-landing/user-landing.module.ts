import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserLandingRoutingModule } from './user-landing-routing.module';
import { UserLandingComponent } from './user-landing.component';


@NgModule({
  declarations: [UserLandingComponent],
  imports: [
    CommonModule,
    UserLandingRoutingModule
  ]
})
export class UserLandingModule { }
