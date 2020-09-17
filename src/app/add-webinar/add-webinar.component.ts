import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import {AddWebinarService} from './add-webinar.service'
import { Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpEventType, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { HttpService } from './../shared/http.service';
import {environment} from './../../environments/environment';

@Component({
  selector: 'app-add-webinar',
  templateUrl: './add-webinar.component.html',
  styleUrls: ['./add-webinar.component.css']
})
export class AddWebinarComponent implements OnInit {
  regForm: FormGroup;
  newEntry: any;
  payload: any;
  traineeData: any;
  status: string = "ACTIVE";
  editTraineeData: any;
  WebinarName: any;
  webinarvideo: any;
  webinarDiscription: any;
  webinarId: any;
  file:any;
  progress:any;
  createdByObj: any;
  createdBy: any;
  selectedFile: File = null;
  showMsg: boolean = false;
  showMsgAdded:boolean=false;
  returnData: any;
  path:any;
  url:any;

  constructor( private http: HttpClient,private router:Router,private formBuilder: FormBuilder,private location: Location,private addWebinarService:AddWebinarService) {
    this.regForm = formBuilder.group({
      webinarName: new FormControl,
      webinarUrl: new FormControl,
      description: new FormControl
    })
   }

   uploadForm(regForm) {
    this.newEntry = {};
    this.payload = { data: {}};

    Object.keys(regForm.controls).map((item) => {
     this.newEntry[item] = regForm.controls[item].value;
    })  
    this.newEntry['createdBy'] = this.createdBy;
    this.newEntry['updatedBy']= this.createdBy;
    this.newEntry['webinarUrl']=this.webinarvideo.replace("C:\\fakepath\\", "");
    //this.newEntry['webinarUrl']=this.path.replace("D:\\ApplicationLive\\webinar_service_ui\\src\\assets\\webinars\\", "");
    this.newEntry['status'] = this.status;
    this.payload['data'] = this.newEntry; 
    this.callAddWebinarService(this.payload.data)
  }
  
  callAddWebinarService(payload) {
        this.addWebinarService.addTrainee(payload).then (res => {
          this.traineeData = res;
         if(res !== undefined){
          this.showMsgAdded = true;
         setTimeout(()=>{
          this.router.navigate(['/dashboard/webinar'])
        },3000
       )
      }      
    })
}

onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    // this.upload();
  }
  upload() {
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    fd.append('Content-Type', 'application/json');
    fd.append('Accept', 'application/json');
    this.progress = 0;
    this.http.post(environment.api_url +'service/webinar/upload', fd, {
      reportProgress: true,
      observe: 'events'
      }).
      subscribe(resp => {
        console.log(resp);
        if (resp.type === HttpEventType.Response) {
          console.log('Upload complete');
      }
      if (resp.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * resp.loaded / resp.total);
          console.log('Progress ' + this.progress + '%');
          }
          this.returnData=resp;
          this.path=this.returnData.path
          this.showMsg=false;
          },
          err => {
            this.showMsg = true;
          }
        );
  }
  ngOnInit(): void {
    this.createdByObj = JSON.parse(localStorage.getItem('userDetails'));
    this.createdBy = this.createdByObj['userId'];
  }
}
