import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangePasswordService } from './change-password.service';
import { StorageService } from '../shared/storage/storage.service';
import { LocationStrategy } from '@angular/common';
import { DashboardService } from '../dashboard/dashboard.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  regForm: FormGroup;
  payload: {};
  isLogged: any;
  userDetails: string;
  userId: any;
  inputFieldData: any;
  display: string;
  logoutResult: any;

  constructor(private formBuilder:FormBuilder,private locationStrategy: LocationStrategy, private router:Router, private changePasswordService:ChangePasswordService, private storage: StorageService, private dashboardService: DashboardService) { 
    this.regForm = formBuilder.group({
      oldPassword: new FormControl,
      password: new FormControl,
      cnfPassword: new FormControl,
    })
  }

  ngOnInit(): void {
    this.userDetails = JSON.parse(localStorage.getItem('userDetail'));
    this.callApiForGetUserId(this.userDetails['username'])
    this.isLogged = JSON.parse(localStorage.getItem('loggedIn'))
    this.isLogged = false
  }

  callApiForGetUserId(payload) {
    this.changePasswordService.getUserId(payload).then ( res => {
      this.userId = res['id'];
    } )
  }

  uploadForm(regForm) {
    this.payload = {data: {userId:this.userId,password:""}};
    this.inputFieldData = {}
    Object.keys(regForm.controls).map((item) => {
      this.inputFieldData[item] = regForm.controls[item].value;
    })
    this.payload['data']['password'] = this.inputFieldData.password;
    if((this.inputFieldData['oldPassword'] == this.userDetails['password'])&& (this.inputFieldData['password'] == this.inputFieldData['cnfPassword'])) {
      this.callChangePasswordService(this.payload['data'])
      this.router.navigate(['/login'])
    } else {
      alert("Please Enter Details Carefully");
    }
  }

  openDropdown() {
    if(this.display == "block") {
            this.display = "none"
    } else {
            this.display = "block";
    }
  }

  logout() {
    this.dashboardService.logout().then ( res => {
            this.redirectToLogout(res)
    })
  }
  redirectToLogout(data) {
    this.storage.clear()
    this.preventBackButton()
    this.logoutResult = data
  }

  preventBackButton() {
    history.pushState(null, null, location.href);
    this.locationStrategy.onPopState(() => {
    history.pushState(null, null, location.href);
    })
  }

  onCloseHandled() {
    this.display = "none"
  }

  callChangePasswordService(payload) {
    this.changePasswordService.setPassword(payload).then (res => {
    })
  }

}
