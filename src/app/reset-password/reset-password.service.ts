import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from './../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http: HttpClient) { }

  setPassword(data) {
    const url = environment.api_url +'service/webinar/user/reset-password?token=' + data.token + "&password=" + data.password;
    return new Promise((resolve,reject) => {
      this.http.put(url,data, { responseType: 'text' }).subscribe(
      res => resolve(res),
      err => reject(err));
    })
  }
}
