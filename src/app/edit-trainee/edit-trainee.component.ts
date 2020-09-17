import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { EditTraineeService } from './edit-trainee.service';
import { ActivatedRoute,Router } from '@angular/router';
import { TraineeService } from '../trainee/trainee.service'

@Component({
  selector: 'app-edit-trainee',
  templateUrl: './edit-trainee.component.html',
  styleUrls: ['./edit-trainee.component.css']
})
export class EditTraineeComponent implements OnInit {

  regForm: FormGroup;
  newEntry: any;
  editId: any;
  traineeData: any;
  editTraineeData: any;
  traineeName: any;
  traineeEmail: any;
  traineeDueDate: any;
  traineeId: any;
  showMsg: boolean = false;
  constructor(private formBuilder: FormBuilder,private location: Location,private router: Router,private editTraineeService: EditTraineeService, private route: ActivatedRoute, private traineeService: TraineeService) { 
    this.regForm = formBuilder.group({
      name: new FormControl,
      username: new FormControl,
      dueDate: new FormControl,
    })
  }

  uploadForm(regForm) {
    this.newEntry = {};
    Object.keys(regForm.controls).map((item) => {
      if (regForm.controls[item].value != this.editTraineeData[item] ) {
        this.newEntry[item] = regForm.controls[item].value;
      }
    })
    
    this.callEditTraineeService(this.newEntry,this.traineeId)
    
  }

  navs() {
    this.router.navigate(['dashboard/trainee'])
  }

  callEditTraineeService(payload,id) {
    this.editTraineeService.editTrainee(payload,id).then (res => {
      this.traineeData = res
      if(res !== undefined){
        this.showMsg = true;
        setTimeout(()=>{
          this.router.navigate(['/dashboard/trainee'])
        },3000
        )
      }
    })
  }

  ngOnInit(): void {
    this.getEditData(this.regForm)
  } 

  getEditData(regForm) {
    this.route.params.subscribe(params => {
      if (Object.keys(params).length > 0) {
        this.editId = (Object.values(params))[0];
      }
    })
    this.callServiceForUserIdDetails(this.editId)
  }

  callServiceForUserIdDetails(data) {
    this.editTraineeService.getUserDetails(data).then(res => {
      this.editTraineeData = res
      this.traineeName = this.editTraineeData.name;
      this.traineeEmail = this.editTraineeData.username;
      this.traineeDueDate = this.editTraineeData.dueDate;
      this.traineeId = this.editTraineeData.id;
    })
  }

}
