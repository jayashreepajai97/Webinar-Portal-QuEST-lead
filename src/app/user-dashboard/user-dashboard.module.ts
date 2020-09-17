import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserLandingRoutingModule } from './user-dashboard-routing.module';
import { UserDashboardComponent } from './user-dashboard.component';


@NgModule({
  declarations: [UserDashboardComponent],
  imports: [
    CommonModule,
    UserLandingRoutingModule
  ]
})
export class UserLandingModule { }
