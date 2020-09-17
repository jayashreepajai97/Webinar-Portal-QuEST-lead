import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private subject : any;

  constructor() { }

  setData(inputData: any) {
    this.subject = inputData;
  }

  getData() : any{
      return this.subject;
  }

}