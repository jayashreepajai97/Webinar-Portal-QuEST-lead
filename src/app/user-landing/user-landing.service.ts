import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserLandingService {

  constructor(private http: HttpClient) { }
  getAll() {
    return new Promise((resolve,reject) => {
      this.http.get('http://localhost:8080/service/webinar/webinars').subscribe(
      res => resolve(res),
      err => reject(err));
    })
  }
}
