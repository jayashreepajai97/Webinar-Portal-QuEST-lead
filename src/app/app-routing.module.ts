import { UserVideoDetailComponent } from './user-video-detail/user-video-detail.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AddWebinarComponent } from './add-webinar/add-webinar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TraineeComponent } from './trainee/trainee.component';
import { WebinarComponent } from './webinar/webinar.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { LoginComponent } from './login/login.component';
import { AddTraineeComponent } from './add-trainee/add-trainee.component'
import { EditTraineeComponent } from './edit-trainee/edit-trainee.component';
import { BulkUploadComponent } from './bulk-upload/bulk-upload.component';
import { EditWebinarComponent } from './edit-webinar/edit-webinar.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ReportsComponent } from './reports/reports.component';
import { EmailTemplateComponent } from './email-template/email-template.component';
import {CheckUserType} from './shared/checkUserType.service';

const routes: Routes = [ 
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent,
  canActivate:[CheckUserType],

     children:[
    
       {path:'',component:SideNavComponent, canActivate:[CheckUserType]},
       {path:'dashboard',component:DashboardComponent, canActivate:[CheckUserType]},
       {path:'bulk-upload',component:BulkUploadComponent, canActivate:[CheckUserType]},
       {path:'sidenav',component:SideNavComponent, canActivate:[CheckUserType]},
       {path:'trainee',component:TraineeComponent, canActivate:[CheckUserType]},
       {path:'webinar',component:WebinarComponent, canActivate:[CheckUserType]},
       {path:'addTrainee',component:AddTraineeComponent,  canActivate:[CheckUserType]},
       {path:'editTrainee',component:EditTraineeComponent,  canActivate:[CheckUserType]},
       {path:'editWebinar/:row.id',component:EditWebinarComponent, canActivate:[CheckUserType]},
       {path:'add-webinar',component:AddWebinarComponent, canActivate:[CheckUserType]},
       {path:'editTrainee/:row.id',component:EditTraineeComponent,  canActivate:[CheckUserType]},
       {path:'reports',component:ReportsComponent, canActivate:[CheckUserType]}
       
      //  {path:'changePassword',component:ChangePasswordComponent}
        ]
      },
      {path:'forgetPassword',component:ForgetpasswordComponent},
      {path:'resetPassword',component:ResetPasswordComponent},
      {path:'dashboard/changePassword',component:ChangePasswordComponent},
      {path:'user-landing/user-video-detail',component:UserVideoDetailComponent},
      {path:'emailTemplate',component:EmailTemplateComponent},
      {path:'user-dashboard',component:UserDashboardComponent,canActivate:[CheckUserType]},
      {path:'user-dashboard/user-video-detail',component:UserVideoDetailComponent,canActivate:[CheckUserType]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[LoginComponent,DashboardComponent,TraineeComponent,WebinarComponent,SideNavComponent,AddTraineeComponent,EditTraineeComponent,BulkUploadComponent,ForgetpasswordComponent,ResetPasswordComponent]



