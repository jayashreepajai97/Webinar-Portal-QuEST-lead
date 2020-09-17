import { UserLandingService } from './user-landing.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { elementAt } from 'rxjs/operators';
@Component({
  selector: 'app-user-landing',
  templateUrl: './user-landing.component.html',
  styleUrls: ['./user-landing.component.css']
})
export class UserLandingComponent implements OnInit {

  constructor( private router: Router,private userlandingService: UserLandingService) { }
  dataSource: any;
  p: number = 1;
  dataSourceCount : any;
  // activeLink = "false";
  // isEnabled = false ;
  displayedColumns: string[] = ['name', 'due_date','status' ,'action','activeLink'];
  ngOnInit(): void {
    this.getAll();
  }
  getAll(){
    this.userlandingService.getAll().then(res => {
      this.dataSource = res;
      // this.dataSource= this.dataSource.map((item)=> {
      //   item.isEnabled = false;
      //   return item ;
      // })
      this.countRow(this.dataSource)
    },
    err =>{
      this.dataSource = false;
    })
  }
  videoDetail(element){
    this.router.navigate(['/user-landing/user-video-detail' ,
     {id :element.id,
       webinarName: element.webinarName,
      description: element.description,
      webinarUrl: element.webinarUrl,
      status: element.status,
     }]);
  }
  countRow(data){
    this.dataSourceCount = data.length;
  }
}
