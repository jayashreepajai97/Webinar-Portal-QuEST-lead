import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }

  logout() {
    return new Promise((resolve,reject) => {
      this.http.get(environment.api_url +'service/webinar/user/logout',{responseType:'text'}).subscribe(
      res => resolve(res),
      err => reject(err));
    })
  }
}
