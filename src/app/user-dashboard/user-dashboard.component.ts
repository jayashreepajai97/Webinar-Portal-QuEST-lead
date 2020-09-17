// import { UserVideoDetailService } from './../user-video-detail/user-video-detail.service';
import { TraineeService } from './../trainee/trainee.service';
import { SharedService } from './../shared/shared.service';
import { element } from 'protractor';
import { UserDashboardService } from './user-dashboard.service';
import { DashboardService } from '../dashboard/dashboard.service';
import { StorageService } from '../shared/storage/storage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { elementAt } from 'rxjs/operators';
import { LocationStrategy } from '@angular/common';



@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})

export class UserDashboardComponent implements OnInit {
  constructor(private router: Router, private locationStrategy: LocationStrategy, private userdashboardService: UserDashboardService, private shareDataService: SharedService, private dashboardService: DashboardService, private storage: StorageService) { }
  dataSource: any;
  p: number = 1;
  dataSourceCount: any;
  searchText: any;
  loggedInUser: any;
  likeCount: any;
  logoutResult: any;
  //  webinarId: any;
  displayedColumns: string[] = ['name', 'status', 'action', 'activeLink'];
  display: string;
  dropdownCounter: boolean;
  dataSourceq: any;
  userRole: any;
  userName: any;
  dueDateUser; any;
  dataSourceUser: any;
  videoControls:any;
  completedCount = 0;
  displayVideo: any;
  numberOfLikes: number = 0;
  numberOfdisLikes: number = 0;
  dataLikeCount: any;
  dataReviewCount: any;
  dataDisLikeCount: any;
  videodetailPopUp: any;
  CountReview:any;
  data = {
    status: '',
    userId: '',
    webinarId: '',
  };

  ngOnInit(): void {
    this.userRole = sessionStorage.getItem('role')
    this.userName = sessionStorage.getItem('name')
    this.userName = this.userName.replace(/^"(.*)"$/, '$1');
    let user = JSON.parse(localStorage.getItem('userDetails'));
    this.loggedInUser = user.userId;
    this.dropdownCounter = false;
    this.getAllEnroll();
    this.getUserDueDate();
  }
  
  navigate() {
    if (this.userRole == 'ADMIN') {
      this.router.navigate(['/dashboard/sidenav']);
    } else {
      this.router.navigate(['/user-dashboard']);
    }
  }
  
  videoDetail(element) {
    if (this.displayVideo == 'block') {
      this.displayVideo = 'none';
    } else {
      this.displayVideo = 'block';
    }
    this.videoControls = document.getElementById("video-controls");
    this.videodetailPopUp = {
      webinarId: element.webinarId,
      webinarName: element.webinarName,
      description: element.description,
      webinarUrl: element.webinarUrl,
      status: element.status,
      webinarAccess: element.webinarAccess,
    }
    this.getAllReview();
  }

  countRow(data) {
    if (data) {
      this.dataSourceCount = data.length;
    }
  }
  countRow1(data) {
    if (data) {
      this.dataReviewCount = data.length;
    }
  }
  reviewVideoLike(element, LIKE) {
    let data = {
      "review": LIKE,
      "userId": this.loggedInUser,
      'webinarId': this.videodetailPopUp.webinarId
    }
    this.userdashboardService.review(data).then(
      res => {
        this.numberOfLikes++;
        this.getAllReview();
      },
      err => {
      }
    )
  }
  reviewVideoDisLike(element, DISLIKE) {
    let data = {
      "review": DISLIKE,
      "userId": this.loggedInUser,
      'webinarId': this.videodetailPopUp.webinarId
    }
    this.userdashboardService.review(data).then(
      res => {
        this.numberOfdisLikes--;
        this.getAllReview();
      },
      err => {
      }
    )
  }
  getAllEnroll() {
    this.completedCount = 0;
    let obj = {
      userId: this.loggedInUser
    };
    this.userdashboardService.getEnroll(obj).then(
      (res) => {
        this.dataSource = res;
        this.countRow(this.dataSource);
        this.dataSource.map(item => {
          if (item.enrollStatus == 'COMPLETED') {
            this.completedCount = this.completedCount + 1;
          }
        })
        // this.getAllReview();
      },
      (err) => { }
    );
  }

  getAllReview() {
    let obj = {
      'webinarId': this.videodetailPopUp.webinarId
    }
    this.userdashboardService.getAllWebinar(obj).then(res => {
      this.CountReview = res;
      this.dataDisLikeCount = this.CountReview.dislike.length
      this.dataLikeCount = this.CountReview.like.length
    },
      err => {
      })
  }
  getUserDueDate() {
    let obj = {
      userId: this.loggedInUser
    };
    this.userdashboardService.getUserDetail(obj).then(
      (res) => {
        this.dataSourceUser = res;
      },
      (err) => { }
    );
  }
  enrollvideo(element, ENROLLED) {
    let data = {
      status: ENROLLED,
      userId: this.loggedInUser,
      webinarId: element.webinarId,
      webinarName: element.webinarName

    };
    this.userdashboardService.enroll(data).then(
      (res) => {
        this.getAllEnroll();
      },
      (err) => { }
    );
  }

  completeStatus(element, COMPLETED) {
    let confirmMsg = confirm("Do you want to mark this Webinar as Completed?");
    if(confirmMsg == false) {
      return false;
    }
    let data = {
      status: COMPLETED,
      userId: this.loggedInUser,
      webinarId: element.webinarId,
    };
    this.userdashboardService.updateCompleteStatus(data).then(
      (res) => {
        this.getAllEnroll();
      },
      (err) => { }
    );
  }

  unMarkCompleteStatus(element, ENROLLED) {
    let data = {
      status: ENROLLED,
      userId: this.loggedInUser,
      webinarId: element.webinarId,
    };
    this.userdashboardService.updateCompleteStatus(data).then(
      (res) => {
        this.getAllEnroll();
      },
      (err) => { }
    );
  }

  openDropdown() {
    if (this.display == 'block') {
      this.display = 'none';
    } else {
      this.display = 'block';
    }
    this.dropdownCounter = true;
  }

  onCloseHandled() {
    this.display = 'none';
  }
  onCloseHandledVideo() {
    this.displayVideo = 'none';
    this.videoControls.pause();
    this.videoControls.currentTime = 0;
  }
  redirectToLogout(data) {
    this.storage.clear()
    this.preventBackButton()
    this.logoutResult = data
  }

  preventBackButton() {
    history.pushState(null, null, location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, null, location.href);
    })
  }

  logout() {
    this.dashboardService.logout().then(res => {
      this.redirectToLogout(res)
    })
  }
}
