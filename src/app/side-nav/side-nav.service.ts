import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {

  constructor(private http: HttpClient) { }
  getAll() {
    return new Promise((resolve,reject) => {
      this.http.get(environment.api_url + 'service/webinar/webinars').subscribe(
      res => resolve(res),
      err => reject(err));
    })
  }

  getChartData(data) {
    const url = environment.api_url + 'service/webinar/report/dashboard/' + data;
    return new Promise((resolve,reject) => {
      this.http.get(url).subscribe(
      res => resolve(res),
      err => reject(err));
    })
  }
}
