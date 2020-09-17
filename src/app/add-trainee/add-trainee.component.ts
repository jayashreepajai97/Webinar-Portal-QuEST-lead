import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { AddTraineeService } from './add-trainee.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-trainee',
  templateUrl: './add-trainee.component.html',
  styleUrls: ['./add-trainee.component.css']
})
export class AddTraineeComponent implements OnInit {

  regForm: FormGroup;
  newEntry: {};
  payload: any;
  traineeData: any;
  selectedGender: any;
  selectedRole: any;
  showMsg:boolean = false;
  showMsgAdd: boolean = false;
  createdBy: string;
  createdByObj: any;
  status: string = "ACTIVE";
  epochValue: any;
  constructor(private router:Router,private formBuilder: FormBuilder,private location: Location, private addTraineeService:AddTraineeService) { 
    this.regForm = formBuilder.group({
      name: new FormControl,
      username: new FormControl,
      dueDate: new FormControl,
      password: new FormControl,
    })
  }

  setRole(data) {
    this.selectedRole = data;
  }

  uploadForm(regForm) {
    this.newEntry = {};
    this.payload = { data: {}};
    Object.keys(regForm.controls).map((item) => {
      this.newEntry[item] = regForm.controls[item].value;
    })
    
    this.newEntry['dueDate'] = this.customDate(this.newEntry['dueDate']);
    this.newEntry['role'] = this.selectedRole;
    this.newEntry['createdBy'] = this.createdBy;
    this.newEntry['updatedBy'] = this.createdBy;
    this.newEntry['status'] = this.status;
    this.payload['data'] = this.newEntry;
    this.callAddTraineeService(this.payload.data)
  }

  customDate(data) {
    let dateFormat = Date.parse(data);
    return dateFormat;
  }

  callAddTraineeService(payload) {
    this.addTraineeService.addTrainee(payload).then (res => {
      this.traineeData = res

      if(res !== undefined){
        this.showMsgAdd = true;
        setTimeout(()=>{
          this.router.navigate(['/dashboard/trainee'])
        },3000
        )
      }      
    },
    err => {
            this.showMsg = true;
          }
        );
  }

  ngOnInit(): void {
    this.createdByObj = JSON.parse(localStorage.getItem('userDetails'));
    this.createdBy = this.createdByObj['userId']
    this.selectedRole ="User"
  }

}
