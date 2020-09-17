import { UserVideoDetailComponent } from './user-video-detail/user-video-detail.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TraineeComponent } from './trainee/trainee.component';
import { WebinarComponent } from './webinar/webinar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatFormFieldControl } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HttpClientModule ,HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './../app/shared/shared.module'
import { LocalStorageService, SessionStorage, SessionStorageService } from 'ngx-store';
import {NgxPaginationModule} from 'ngx-pagination';
import { AddTraineeComponent } from './add-trainee/add-trainee.component';
import { BulkUploadComponent } from './bulk-upload/bulk-upload.component';
import { EditTraineeComponent } from './edit-trainee/edit-trainee.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component'
import {  ROUTES } from '@angular/router';
import { AddWebinarComponent } from './add-webinar/add-webinar.component';
import { EditWebinarComponent} from './edit-webinar/edit-webinar.component';
import { JwtInterceptor } from './../app/shared/jwt.interceptor/jwt.interceptor.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ReportsComponent } from './reports/reports.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { EmailTemplateComponent } from './email-template/email-template.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TraineeComponent,
    WebinarComponent,
    SideNavComponent,
    LoginComponent,
    AddTraineeComponent,
    BulkUploadComponent,
    EditTraineeComponent,
    AddWebinarComponent,
    EditWebinarComponent,
    ForgetpasswordComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    UserVideoDetailComponent,
    ReportsComponent,
    EmailTemplateComponent,
    UserDashboardComponent,
    UserVideoDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    SharedModule,
    NgxPaginationModule,
    // RouterModule.forRoot(routes),
    Ng2SearchPipeModule,
    HighchartsChartModule,
    // .forRoot(
    //   require('highcharts'),
    //   require('highcharts/modules/exporting'),
    //   require('highcharts/highcharts-3d')
    // ),
    // RouterModule,
    Ng2SearchPipeModule,
    
  ],

  providers: [SessionStorageService,{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true } ],
  // exports:[RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
