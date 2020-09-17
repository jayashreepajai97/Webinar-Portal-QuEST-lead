import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgetpasswordService {

  constructor(private http: HttpClient) { }

  sendLink(data) {
    const url = environment.api_url + 'service/webinar/user/forgot-password?email=' + data.email;
    return new Promise((resolve,reject) => {
      this.http.post(url,data, { responseType: 'text' }).subscribe(
      res => resolve(res),
      err => reject(err));
    })
  }
}
