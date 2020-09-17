import { Injectable } from '@angular/core';
import { HttpService } from './../shared/http.service';
import * as jwt_decode from 'jwt-decode';
import {environment} from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor( private httpClient: HttpService) { }
  getCustomerDetails(data) {
    return new Promise((resolve, reject) => {
      this.httpClient.call(data, `service/webinar/user/login`, 'POST').subscribe(
        res => resolve(res),
        err => reject(err)
      );
    });
  }
}
// ?username=` + data.username + `&password=` + data.password