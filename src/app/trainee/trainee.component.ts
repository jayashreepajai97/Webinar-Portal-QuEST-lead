import { Component, OnInit } from '@angular/core';
import { TraineeService } from './trainee.service';
import { Router } from '@angular/router';
import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-trainee',
  templateUrl: './trainee.component.html',
  styleUrls: ['./trainee.component.css']
})
export class TraineeComponent implements OnInit {
  display = "none";
  tab = 'User';
  userCounter: boolean;
  number: number;
  dataSource: any;
  dataSourceAdmin: any;
  dataSourceUser: any;
  dataSourceCount: any;
  displayedColumns: string[] = ['name', 'username', 'dueDate', 'action'];
  p: number = 1;
  deleteId: any;
  searchText: any;
  data: any;
  showMsg: boolean = false;
  dataSourceAdminCount: any;
  constructor(private router:Router, private traineeService: TraineeService) { }

  ngOnInit(): void {
    this.getData();
    this.userCounter = true;
    this.set(0);
  }

  navigate() {
    this.router.navigate[('/dashboard/addTrainee')]
  }

  openModal(deleteId) {
    this.deleteId = deleteId;
    this.display = "block";
  }

  set(event: number) {
    this.number = event;
    switch (this.number) {
      case 0:
        this.userCounter = true;
        this.countRow(this.dataSourceUser)
        break;
      case 1:
        this.userCounter = false;
        this.countRowAdmin(this.dataSourceAdmin)
        break;
      default: alert("error");
    }
  }

  onCloseHandled() {
    this.display = "none";
  }

  deleteTrainee(data) {
    this.display = 'none';
    this.traineeService.deleteTrainee(data).then(res => {
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

  countRowAdmin(data) {
    if(data) {
      this.dataSourceAdminCount = data.length;
    }
  }

  countRow(data) {

    if (data) {
      this.dataSourceCount = data.length;
    }
  }

  editTrainee(payload) {
    this.router.navigate(['dashboard/editTrainee', payload.id]);
  }

  getData() {
    this.dataSourceAdmin = [];
    this.dataSourceUser = [];
    this.traineeService.getTrainee().then(res => {
      this.dataSource = res;
      this.dataSource.map((item) => {
        if(item.role == 'USER') {
          this.dataSourceUser.push(item)
        } else {
          this.dataSourceAdmin.push(item)
        }
      })
      this.countRow(this.dataSourceUser)
      this.countRowAdmin(this.dataSourceAdmin)
    },
      err => {
        this.dataSource = false;
      })
  }

  BulkUploadFunc() {
    this.router.navigate(['/dashboard/bulk-upload']);
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
    a.setAttribute('download', 'TraineeList.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  downloadFunc() {
    this.data = this.dataSourceUser;
    const mappedData = this.data.map(row => ({
      username: row.username,
      name: row.name,
      role: row.role,
      dueDate: row.dueDate
    }))
    const csvData = this.ObjectToCsv(mappedData);
    this.download(csvData);
  }

  downloadAdminData() {
    this.data = this.dataSourceAdmin;
    const mappedData = this.data.map(row => ({
      username: row.username,
      name: row.name,
      role: row.role,
      dueDate: row.dueDate
    }))
    const csvData = this.ObjectToCsv(mappedData);
    this.downloadAdminList(csvData);
  }

  downloadAdminList(csvData) {
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'AdminList.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}