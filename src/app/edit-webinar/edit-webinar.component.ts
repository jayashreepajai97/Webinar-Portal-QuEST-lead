import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
 import { EditWebinarService } from './edit-webinar.service';
 import { ActivatedRoute,Router } from '@angular/router';
 import { WebinarService } from '../webinar/webinar.service';
 import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpEventType, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { HttpService } from './../shared/http.service';
import {environment} from './../../environments/environment';


// EditWebinarService

@Component({
  selector: 'app-edit-webinar',
  templateUrl: './edit-webinar.component.html',
  styleUrls: ['./edit-webinar.component.css']
})
export class EditWebinarComponent implements OnInit {
  regForm: FormGroup;
  newEntry: any;
    editId: any;
    traineeData: any;
    editTraineeData: any;
    WebinarName: any;
    webinarUrl: any;
    webinarUrlEdit: any;
    webinarDescription: any;
    webinarId: any;
    progress:any;
    returnData: any;
    path:any;
    selectedFile: File = null;
    showMsg: boolean = false;


  payload: { data: {}; };

    constructor(private http: HttpClient,private formBuilder: FormBuilder,private location: Location,private router: Router,private editWebinarService: EditWebinarService, private route: ActivatedRoute, private webinarService: WebinarService) {
      this.regForm = formBuilder.group({
        webinarName: new FormControl,
        webinarUrl: new FormControl,
        description: new FormControl
      })
   }

   uploadForm(regForm) {
     this.payload = {data : {}}
        this.newEntry = {};
        Object.keys(regForm.controls).map((item) => {
          if (regForm.controls[item].value != this.editTraineeData[item] ) {
            this.newEntry[item] = regForm.controls[item].value;
          }
        })
        if(this.webinarUrl==null){
          this.newEntry['webinarUrl']=this.webinarUrlEdit.replace("C:\\fakepath\\", "");
        }
        else{
          this.newEntry['webinarUrl']=this.webinarUrl.replace("C:\\fakepath\\", "");
        }
        this.callEditWebinarService(this.newEntry,this.webinarId)
      }

  navs() {
    this.router.navigate(['dashboard/trainee'])
  }

  callEditWebinarService(payload,id) {
    this.editWebinarService.editTrainee(payload,id).then (res => {
      this.traineeData = res
       if(res !== undefined){
       this.showMsg = true;
       setTimeout(()=>{
      this.router.navigate(['/dashboard/webinar'])
    },3000
    )
  }
})
}
  ngOnInit(): void {
    this.getEditData(this.regForm)
  }

  callServiceForWebinarIdDetails(data) {
    this.editWebinarService.getWebinarDetails(data).then( res => {
      this.editTraineeData = res;
      this.WebinarName = this.editTraineeData.webinarName;
      this.webinarUrlEdit = this.editTraineeData.webinarUrl;
      this.webinarId = this.editTraineeData.id;
      this.webinarDescription = this.editTraineeData.description
    })
  }
  
  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }
  upload() {
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    fd.append('Content-Type', 'application/json');
    fd.append('Accept', 'application/json');

    this.http.post(environment.api_url +'service/webinar/upload', fd, {
      reportProgress: true,
      observe: 'events'
      }).
      subscribe(resp => {
        console.log(resp);
        if (resp.type === HttpEventType.Response) {
          this.webinarUrlEdit ="";
          console.log('Upload complete');
      }if (resp.type === HttpEventType.UploadProgress) {
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
  getEditData(regForm) {
    this.route.params.subscribe(params => {
      if (Object.keys(params).length > 0) {
        this.editId = (Object.values(params))[0];
      }
    })
    this.callServiceForWebinarIdDetails(this.editId)
  }
}
