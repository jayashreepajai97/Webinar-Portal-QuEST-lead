import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../shared/storage/storage.service';
import * as jwt_decode from 'jwt-decode';
import {environment} from './../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor(private http:HttpClient, private storage:StorageService) { }

  setPassword(data) {
    const url = environment.api_url +'service/webinar/user/' + data.userId;
    return new Promise((resolve,reject) => {
      this.http.patch(url,data, { responseType: 'text' }).subscribe(
      res => resolve(res),
      err => reject(err));
    })
  }

  getUserId(data) {
    const url = environment.api_url +'service/webinar/username/' + data;
    return new Promise((resolve,reject) => {
      this.http.get(url).subscribe(
      res => resolve(res),
      err => reject(err));
    })
  }
}
