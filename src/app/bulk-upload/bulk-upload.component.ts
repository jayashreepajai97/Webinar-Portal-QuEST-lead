import { Component, OnInit } from '@angular/core';
import { TraineeService } from '../trainee/trainee.service';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../shared/storage/storage.service'
import { HttpService } from './../shared/http.service';
//import {  Http, Response, Headers, RequestOptions } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser'
import {environment} from './../../environments/environment';


@Component({
  selector: 'app-bulk-upload',
  templateUrl: './bulk-upload.component.html',
  styleUrls: ['./bulk-upload.component.css']
})
export class BulkUploadComponent implements OnInit {

  selectedFile: File = null;
  created=[];
  failed= [];
  public data: any;
  public email:any;

  constructor(private http: HttpClient, private trainee: TraineeService) { }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }
  OnUpload() {
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    fd.append('Content-Type', 'application/json');
    fd.append('Accept', 'application/json');


    this.http.post(environment.api_url + 'service/webinar/users/bulk', fd).
        subscribe(data => {
          this.data=data;
          this.failed=this.data.failed;
          this.created=this.data.created;
      });

  }
  ngOnInit(): void {
  
   }
}