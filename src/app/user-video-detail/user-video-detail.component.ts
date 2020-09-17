import { UserVideoDetailService } from './user-video-detail.service';
import { UserDashboardService } from '../user-dashboard/user-dashboard.service';
import { element } from 'protractor';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from './../shared/shared.service';
import { StorageService } from '../shared/storage/storage.service';
import { LocationStrategy } from '@angular/common';
import { DashboardService } from '../dashboard/dashboard.service';
@Component({
  selector: 'app-user-video-detail',
  templateUrl: './user-video-detail.component.html',
  styleUrls: ['./user-video-detail.component.css']
})
export class UserVideoDetailComponent implements OnInit {
  data = {};
  loggedInUser: any;
  dataSource: any;
  dataSourceCount: any;
  numberOfLikes: number = 0;
  numberOfdisLikes: number = 0;
  dataLikeCount: any;
  dataReviewCount: any;
  dataDisLikeCount: any;
  display: string;
  logoutResult: any;
  dropdownCounter: boolean;
  userRole: string;
  userName: string;
  constructor(private activeRoute: ActivatedRoute, private userdashboardService: UserDashboardService, private userDetailServiceService: UserVideoDetailService, private shareDataService: SharedService,private storage: StorageService,private locationStrategy: LocationStrategy,private dashboardService: DashboardService, private router: Router) {
    let value = activeRoute.snapshot.params;
    this.data = {
      webinarId: activeRoute.snapshot.params.webinarId,
      webinarName: activeRoute.snapshot.params.webinarName,
      description: activeRoute.snapshot.params.description,
      webinarUrl: activeRoute.snapshot.params.webinarUrl
    };
  }
  ngOnInit(): void {
    this.userRole = sessionStorage.getItem('role')
    this.userName = sessionStorage.getItem('name')
    this.userName = this.userName.replace(/^"(.*)"$/, '$1');
    let user = JSON.parse(localStorage.getItem('userDetails'))
    this.loggedInUser = user.userId;
    this.getAllReview(this.data);
    this.dropdownCounter = false;
    
  }

  navigate() {
    if(this.userRole == 'ADMIN') {
            this.router.navigate(['/dashboard/sidenav']);
    } else {
            this.router.navigate(['/user-dashboard']);
    }
  }
  
  getAllReview(data) {
    let obj = {
      "webinarId": data.webinarId
    }
    this.userDetailServiceService.getAllWebinar(obj).then(res => {
      this.dataSourceCount = res;
      this.dataDisLikeCount = this.dataSourceCount.dislike.length
      this.dataLikeCount = this.dataSourceCount.like.length
    },
      err => {
      })
  }
  reviewVideoLike(element, LIKE) {
    let data = {
      "review": LIKE,
      "userId": this.loggedInUser,
      'webinarId': element.webinarId
    }
    this.userDetailServiceService.review(data).then(
      res => {
        this.numberOfLikes++;
        this.getAllReview(this.data);
      },
      err => {
      }
    )
  }
  reviewVideoDisLike(element, DISLIKE) {
    let data = {
      "review": DISLIKE,
      "userId": this.loggedInUser,
      "webinarId": element.webinarId
    }
    this.userDetailServiceService.review(data).then(
      res => {
        this.numberOfdisLikes++;
        this.getAllReview(this.data);
      },
      err => {
      }
    )
  }
  countRow(data) {
    if (data) {
      this.dataReviewCount = data.length;
    }
  }
  openDropdown() {
    if (this.display == "block") {
      this.display = "none"
    } else {
      this.display = "block";
    }
    this.dropdownCounter = true;
  }
  onCloseHandled() {
    this.display = "none"
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
      this.dashboardService.logout().then ( res => {
              this.redirectToLogout(res)
      })
  }
}
