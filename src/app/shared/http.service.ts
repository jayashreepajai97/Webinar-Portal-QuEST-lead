import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }
  call(data, api, method) {
    const headers = new HttpHeaders();
    return this.http.request(method,environment.api_url + api, {
      body: data,
      headers: headers,
      // responseType: 'text' 
    })
  }
}

