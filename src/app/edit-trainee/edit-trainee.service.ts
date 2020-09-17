import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from './../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EditTraineeService {

  constructor(private http: HttpClient) { }

  editTrainee(data,id){

    const url = environment.api_url +"service/webinar/user/" + id; 
    return new Promise((resolve,reject) => {
      this.http.patch(url,data, { responseType: 'text' }).subscribe(
      res => resolve(res),
      err => reject(err));
    })
  }

  getUserDetails(data){

    const url = environment.api_url + "service/webinar/user/" + data; 
    return new Promise((resolve,reject) => {
      this.http.get(url).subscribe(
      res => resolve(res),
      err => reject(err));
    })
  }
}

