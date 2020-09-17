import { Injectable, resolveForwardRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddTraineeService {

  traineeData:any

  constructor(private http: HttpClient) { }

  addTrainee(data){
    
    return new Promise((resolve,reject) => {
      this.http.post(environment.api_url + 'service/webinar/user/registration',data).subscribe(
      res => resolve(res),
      err => reject(err));
    })
  }
}


