import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ResetPasswordService } from './reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  regForm: FormGroup;
  payload: any;
  resetLink: string;
  linkTokenArr: any;
  linkToken: any;
  resetEntry: any = {data:{token:"",password:""}};
  cnfPassword: any;

  constructor(private formBuilder:FormBuilder, private router:Router, private resetPasswordService: ResetPasswordService) {
    this.regForm = formBuilder.group({
      password: new FormControl,
      cnf_password :new FormControl
    })
  }

  ngOnInit(): void {
    this.resetLink = localStorage.getItem('resetLink');
    this.linkTokenArr = this.resetLink.split('=');
    this.linkToken = this.linkTokenArr[this.linkTokenArr.length - 1]
  }

  uploadForm(regForm) {
    this.cnfPassword = regForm.controls.cnf_password.value
    this.resetEntry.data.password = regForm.controls.password.value;
    this.resetEntry.data.token = this.linkToken
    if(this.resetEntry.data.password == this.cnfPassword) {
      this.callResetPasswordService(this.resetEntry.data)
      this.router.navigate(['/login'])
    } else {
      alert("Please make sure that Password and Confirm Password matches ")
    }
  }

  setConfirmPassword(event){
  }

  callResetPasswordService(data) {
    this.resetPasswordService.setPassword(data).then (res => {
    })
  }

}
