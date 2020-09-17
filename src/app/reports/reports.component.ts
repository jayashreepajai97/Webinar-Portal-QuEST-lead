import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ReportsService } from './reports.service'

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  tab = 'User';
  userCounter: boolean;
  number: number;
  searchText: string;
  selectedFromDate: string;
  selectedEndDate: any;
  dataSourceUser: any;
  dataSourceWebinar: any;
  dataSourceCountWebinar: number;
  dataSourceCountUser: number;
  dateArray: string[];
  fromDate: any;
  endDate: string;
  payload: any = []
  today: any;

  constructor(private router:Router, private reportsService: ReportsService) { }

  ngOnInit(): void {
    this.userCounter = true;
    this.set(0);
    this.today = new Date();
    var dd = String(this.today.getDate()).padStart(2, '0');
    var mm = String(this.today.getMonth() + 1).padStart(2, '0');
    var yyyy = this.today.getFullYear();
    this.today = dd + '-' + mm + '-' + yyyy;
    this.selectedFromDate = this.today;
    this.selectedEndDate = this.today
    this.payload['fromDate'] = this.today;
    this.payload['toDate'] = this.today;
    this.callServiceForLoginDetailsPayload(this.payload);
    this.callServiceForWebinarDetailsPayload(this.payload);
  }

  countRowUser(data) {
    if(data) {
      this.dataSourceCountUser = data.length;
    }
  }

  countRowWebinar(data) {
    if(data) {
      this.dataSourceCountWebinar = data.length;
    }
  }

  set(event: number) {
    this.number = event;
    switch (this.number) {
      case 0:
        this.userCounter = true;
        break;
      case 1:
        this.userCounter = false;
        break;
      default: alert("error");
    }
  }

  setFromDate(data) {
    this.selectedFromDate = data;
    this.dateArray = this.selectedFromDate.split('-');
    this.fromDate = this.dateArray[2] + "-" + this.dateArray[1] + "-" + this.dateArray[0];
    this.setPayload()
  }

  setEndDate(data) {
    this.selectedEndDate = data;
    this.dateArray = this.selectedEndDate.split('-');
    this.endDate = this.dateArray[2] + "-" + this.dateArray[1] + "-" + this.dateArray[0];
    this.setPayload()
  }

  setPayload() {
    this.payload['fromDate'] = this.fromDate;
    this.payload['toDate'] = this.endDate;
    if(this.payload['fromDate'] && this.payload['toDate']) {
      if(Date.parse(this.selectedFromDate) <= Date.parse(this.selectedEndDate)) {
        this.callServiceForLoginDetailsPayload(this.payload);
        this.callServiceForWebinarDetailsPayload(this.payload);
      } else {
        alert("Please select dates carefully")
      }
    }
  }

  callServiceForLoginDetailsPayload(payload) {
    this.reportsService.getViewedUsersPayload(payload).then(res => {
      this.dataSourceUser = res;
      this.countRowUser(this.dataSourceUser)
    })
  }

  callServiceForWebinarDetailsPayload(payload) {
    this.reportsService.getViewedWebinarsPayload(payload).then(res => {
      this.dataSourceWebinar = res;
      this.countRowWebinar(this.dataSourceWebinar)
    })
  }


  ObjectToCsv(mappedData) {
    const csvRows = [];
    const headers = Object.keys(mappedData[0]);
    csvRows.push(headers.join(','));

    for (const row of mappedData) {
      const values = headers.map(header => {
        const escaped = ('' + row[header]).replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(','));
    }
    return csvRows.join('\n');
  }

  download(csvData) {
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'LoginHistory.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  
  downloadWebinar(csvData) {
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'WebinarStatus.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  downloadFuncLoginHistory() {
    this.payload = this.dataSourceUser;
    const mappedData = this.payload.map(row => ({
      TraineeName: row.name,
      LoginDateAndTime: row.loginTs,
    
    }))
    const csvData = this.ObjectToCsv(mappedData);
    this.download(csvData);
  }

  downloadWebinarStatusHistory()
  {
    this.payload = this.dataSourceWebinar;
    const mappedData = this.payload.map(row => ({
      traineeName: row.traineeName,
      webinarName:row.webinarName,
    
    }))
    const csvData = this.ObjectToCsv(mappedData);
    this.downloadWebinar(csvData);
  }


}
