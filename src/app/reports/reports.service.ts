import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient) { }

  getViewedUsersPayload(payload) {
    const url = environment.api_url + 'service/webinar/report/users?fromDate=' + payload.fromDate + "&toDate=" + payload.toDate;
    return new Promise((resolve,reject) => {
      this.http.get(url).subscribe(
      res => resolve(res),
      err => reject(err));
    })
  }

  getViewedWebinarsPayload(payload) {
    const url = environment.api_url + 'service/webinar/report/webinars?fromDate=' + payload.fromDate + "&toDate=" + payload.toDate;
    return new Promise((resolve,reject) => {
      this.http.get(url).subscribe(
      res => resolve(res),
      err => reject(err));
    })
  }
}
