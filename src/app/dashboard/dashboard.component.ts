import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from './dashboard.service';
import { StorageService } from '../shared/storage/storage.service';
import { LocationStrategy } from '@angular/common';
import * as $ from 'jquery';

//  declare var $: any;

@Component({
        selector: 'app-dashboard',
        templateUrl: './dashboard.component.html',
        styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
        tab = 'Dashboard';
        number: number;
        name: any = "jayashreepajai97@gmail.com";
        @ViewChild('navdrop', {static:false}) navdrop: ElementRef;
        display: string;
        logoutResult: any;
        userRole: any;
        userName: any;
        userNameArr: any;
        constructor(private locationStrategy: LocationStrategy,private router: Router, private dashboardService: DashboardService, private storage: StorageService) { }
        ngOnInit() {
                this.userRole = sessionStorage.getItem('role')
                this.userName = sessionStorage.getItem('name')
                this.userName = this.userName.replace(/^"(.*)"$/, '$1');
        }

        onCloseHandled() {
                this.display = "none"
        }

        openDropdown() {
                if(this.display == "block") {
                        this.display = "none"
                } else {
                        this.display = "block";
                }
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

        navigate() {
                if(this.userRole == 'ADMIN') {
                        this.router.navigate(['/dashboard/sidenav']);
                } else {
                        this.router.navigate(['/user-dashboard']);
                }
        }

        logout() {
                this.dashboardService.logout().then ( res => {
                        this.redirectToLogout(res)
                })

        }

        change() {

        }

        set(event: number) {
                this.number = event;
                switch (this.number) {
                        case 0:
                                this.router.navigate(['/dashboard/sidenav']);
                                break;
                        case 1:
                                this.router.navigate(['/dashboard/trainee']);
                                break;
                        case 2:
                                this.router.navigate(['/dashboard/category']);
                                break;
                        case 3: this.router.navigate(['/dashboard/webinar']);
                                break;
                        case 4: this.router.navigate(['dashboard/reports']);
                                break;
                        default: alert("error");
                }
        }
}


