import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TraineeService {

  constructor(private http: HttpClient) { }

  getTrainee() {
    return new Promise((resolve,reject) => {
      this.http.get(environment.api_url + 'service/webinar/users').subscribe(
      res => resolve(res),
      err => reject(err));
    })
  }

  deleteTrainee(data) {
       const url = environment.api_url + "service/webinar/user/" + data; 
    return new Promise((resolve,reject) => {
      this.http.delete(url,data).subscribe( 
      res => {
        resolve(res)},
      err => {
        console.dir(err);
        reject(err)});
    })
  }
}