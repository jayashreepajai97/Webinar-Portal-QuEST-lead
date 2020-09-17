import { Component, OnInit } from '@angular/core';
import { WebinarService } from './webinar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-webinar',
  templateUrl: './webinar.component.html',
  styleUrls: ['./webinar.component.css']
})
export class WebinarComponent implements OnInit {
  displayedColumns: string[] = ['video', 'webinar','description' ,'due_date', 'action'];
  dataSource: any;
  display = "none";
  p: number = 1;
  dataSourceCount: any;
  deleteId: any;
  searchText: any;
  data: any;
  displayVideo:any;
  videodetailPopUp: any;
  showMsg: boolean;
  videoControls: any;
  constructor(private webinarService: WebinarService, private router: Router) { }

  ngOnInit(): void {
    this.getData();
  }
  navigate() {
    this.router.navigate[('/dashboard/addwebinar')]
  }

  openModal(deleteId) {
    this.deleteId = deleteId;
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }

  openModalVideo() {
    this.display = "block";
  }

  countRow(data) {
    if (data) {
      this.dataSourceCount = data.length;
    }
  }

  editWebinar(payload) {
    this.router.navigate(['dashboard/editWebinar', payload.id]);
  }

  deleteWebinar(data) {
    this.display = 'none';
    this.webinarService.deleteWebinar(data).then(res => {
      this.getData();

      if (res !== undefined) {
        this.showMsg = true;
        setTimeout(() => {
          this.showMsg = false;
        }, 3000);
      }
    },
      err => {
        this.dataSource = false;
      }
    );
  }

  getData() {
    this.webinarService.getTrainee().then(res => {
      this.dataSource = res;
      this.countRow(this.dataSource)
     },
      err => {
        this.dataSource = false;
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
    a.setAttribute('download', 'WebinarList.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  downloadFunc() {
    this.data = this.dataSource;
    const mappedData = this.data.map(row => ({
      webinarName: row.webinarName,
      webinarUrl: row.webinarUrl,
      description: row.description
    }))
    const csvData = this.ObjectToCsv(mappedData);
    this.download(csvData);
  }
  videoDetail(element) {
    if (this.displayVideo == 'block') {
      this.displayVideo = 'none';
    } else {
      this.displayVideo = 'block';
    }
    this.videoControls = document.getElementById("video-control");
    console.log(this.videoControls)
    this.videodetailPopUp = {
      webinarId: element.webinarId,
      webinarName: element.webinarName,
      description: element.description,
      webinarUrl: element.webinarUrl,
      status: element.status,
      webinarAccess: element.webinarAccess,
    }
  }
  onCloseHandledVideo() {
    this.displayVideo = 'none';
    this.videoControls.pause();
    this.videoControls.currentTime = 0;
  }
}