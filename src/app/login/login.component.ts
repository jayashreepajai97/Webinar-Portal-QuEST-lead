import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { StorageService } from '../shared/storage/storage.service';
import { LocationStrategy } from '@angular/common';
import * as jwt_decode from 'jwt-decode';
import { SharedService } from './../shared/shared.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    password: new FormControl('', [Validators.required, Validators.minLength(10)])
  });
  activeLink = true;
  data = {
    username: '',
    password: ''
  }
  showMsg: boolean = false;

  constructor(private router: Router, private locationStrategy: LocationStrategy, private http: HttpClient, private login: LoginService, private storage: StorageService, private shareDataService: SharedService) { 
    
  }
  ngOnInit() {
  }

  apiCall() {
    let data = {
      "username": this.data.username,
      "password": this.data.password
    }
    localStorage.setItem('userDetail', JSON.stringify(data))
    this.login.getCustomerDetails(data).then(
      res => {
        this.storage.setData(res);
        let loggedInUser = { 'userId': res['userId'] }
        localStorage.setItem('userDetails', JSON.stringify(loggedInUser))
        this.shareDataService.setData(loggedInUser)
        const token = res['token']
        const decoded = jwt_decode(token);
        sessionStorage.setItem('name',JSON.stringify(decoded.name))
        sessionStorage.setItem('role',JSON.stringify(decoded.rol))
        if (decoded.rol === 'ADMIN') {
          if(res['firstLogin'] == 'NO') {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['dashboard/changePassword']);
          }
        }
        else {
          if(res['firstLogin'] == 'NO') {
            this.router.navigate(['/user-dashboard']);
          } else {
            this.router.navigate(['dashboard/changePassword']);
          }
        }
      },
      err => {
        this.showMsg = true;        
      }
    )
  }
  redirect() {
    this.router.navigate(['forgetPassword']);
  }
}
