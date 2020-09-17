import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgetpasswordService } from './forgetpassword.service';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../shared/storage/storage.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {


  redirectLink: any;
  regForm: FormGroup;
  payload: {};
  newEntry: {};
  redirectLinks: void;
  linkToken: any;
  linkTokenArr: any;
  password: string;
  resetEntry: {};
  result: any;

  constructor(private http:HttpClient,private storage: StorageService,private formBuilder:FormBuilder, private router:Router, private forgetPasswordService: ForgetpasswordService) {
    this.regForm = formBuilder.group({
      email: new FormControl,
    })
  }

  ngOnInit(): void {
  }

  uploadForm(regForm) {
    this.newEntry = {}
    this.payload = { data: {}};
    Object.keys(regForm.controls).map((item) => {
      this.newEntry[item] = regForm.controls[item].value;
    })
    this.payload['data'] = this.newEntry
    this.callForgotService(this.payload['data'])
    this.router.navigate(['/emailTemplate'])
  }

  async callForgotService(payload){
    await this.forgetPasswordService.sendLink(payload).then (res => {
      if(res !== undefined) {
        this.redirectLink = res
        localStorage.setItem('resetLink',this.redirectLink)
      }
    }, err => {
    })
  }

}
