import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-email-template',
  templateUrl: './email-template.component.html',
  styleUrls: ['./email-template.component.css']
})
export class EmailTemplateComponent implements OnInit {

  resetLink: string;
  resetLinkArr: string[];
  portChangeArr: any;
  portNumber: any;

  constructor() { }

  ngOnInit(): void {
    this.resetLink = localStorage.getItem('resetLink')
    this.resetLinkArr = this.resetLink.split(':');
    this.portChangeArr = this.resetLinkArr[this.resetLinkArr.length - 1].split('/')
    this.portNumber = this.portChangeArr[0]
    this.portChangeArr[0] = "4200"
  }

}
