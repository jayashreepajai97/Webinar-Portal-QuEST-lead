import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserDashboardService {

  constructor(private http: HttpClient) { }
  enroll(data) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.api_url + 'service/webinar/enroll', data).subscribe(
        res => resolve(res),
        err => reject(err));
    })
  }
  
  updateCompleteStatus(data) {
    return new Promise((resolve, reject) => {
      this.http.patch(environment.api_url + 'service/webinar/enroll', data).subscribe(
        res => resolve(res),
        err => reject(err));
    })
  }
  unMarkCompleteStatus(data) {
    return new Promise((resolve, reject) => {
      this.http.patch(environment.api_url + 'service/webinar/enroll', data).subscribe(
        res => resolve(res),
        err => reject(err));
    })
  }
  getEnroll(data) {
    return new Promise((resolve,reject) => {
      this.http.get(environment.api_url + `service/webinar/user-enrolls/${data.userId}`).subscribe(
      res => resolve(res),

      err => reject(err)); 
    })
  }
  getUserDetail(data) {
    return new Promise((resolve,reject) => {
      this.http.get(environment.api_url + `service/webinar/user/${data.userId}`).subscribe(
      res => resolve(res),
      err => reject(err)); 
    })
  }
  logout() {
    return new Promise((resolve,reject) => {
      this.http.get(environment.api_url + 'service/webinar/user/logout',{responseType:'text'}).subscribe(
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
  review(data) {
    return new Promise((resolve,reject) => {
      this.http.post(environment.api_url + 'service/webinar/webinar/addReview',data).subscribe(
      res => resolve(res),
      err => reject(err));
    })
  }
}