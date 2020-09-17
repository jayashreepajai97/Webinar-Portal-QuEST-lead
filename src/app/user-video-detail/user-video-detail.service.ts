import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserVideoDetailService {

  constructor(private http: HttpClient) { }
  getAll() {
    return new Promise((resolve,reject) => {
      this.http.get(environment.api_url + 'service/webinar/webinars').subscribe(
      res => resolve(res),
      err => reject(err));
    })
  }
  review(data) {
    return new Promise((resolve,reject) => {
      this.http.post(environment.api_url + 'service/webinar/webinar/addReview',data).subscribe(
      res => resolve(res),
      err => reject(err));
    })
  }
  getAllWebinar(data) {
    return new Promise((resolve,reject) => {
      this.http.get( environment.api_url + `service/webinar/getReviewByWebinarId/${data.webinarId}`).subscribe(
      res => resolve(res),  
      err => reject(err));
      
    })
  }
}
