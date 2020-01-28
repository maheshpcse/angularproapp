import { Component, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { Subscription, timer, pipe, Observable, Subject } from 'rxjs';
import { switchMap, takeUntil, catchError } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userData: any = [];
  public role = sessionStorage.getItem('role');
  public roles: any = [];
  public rolesArr: any = [];

  subscription: Subscription;
  notificationsCount: any = 0;

  constructor(
    private route: Router,
    private authService: AuthService,
    public sharedService: SharedService
  ) { }

  ngOnInit() {
    $("#menu-toggle").click(function (e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
    console.log("curret role is:", this.role);

    this.getUserInfo();

    // this.subscription = timer(0, 10000).pipe(
    //   switchMap(() => this.sharedService.getNotificationsCount())
    // ).subscribe(res => {
    //   console.log("response isss:", res);
    //   if (res['success'] == true) {
    //     console.log("Notifications response:", res['data']);
    //     this.notificationsCount = res['data'].length ? res['data'].length : 0;
    //   } else {
    //     console.log("Error while getting notifications count");
    //   }
    //   this.getDbConnection();
    // });

    this.getNotificationsCount();
  }

  getDbConnection() {
    this.sharedService.getDbConnection().subscribe(res => {
      if (res['success'] == false) {
        console.log("Database connection error", res['data']);
      } else if (res['success'] == true) {
        console.log("Database connection success", res['data']);
      }
    })
  }

  logOut() {
    localStorage.clear();
    sessionStorage.clear();
    this.route.navigate(['']);
  }

  getUserInfo() {
    let data = {
      username: sessionStorage.getItem('id')
    }
    this.authService.getUserProfile(data).subscribe(res => {
      if (res['success'] == true) {
        this.userData = res['data'];
        console.log("user data is:", this.userData);
        // this.role = this.userData[0].role;
        for (let i = 0; i < this.userData.length; i++) {
          this.roles.push(this.userData[i].assigned_roles.split(','));
        }
        for (let i = 0; i < this.roles[0].length; i++) {
          this.rolesArr.push(this.roles[0][i]);
        }
        this.rolesArr.push(this.role);
        console.log("roles is:", this.rolesArr);
      } else {
        console.log("Error while getting user data");
      }
    })
  }

  changeRole(role: any) {
    console.log("get role is:", role);
    sessionStorage.setItem('role', role);
    window.location.reload();
    // this.route.navigate(['/dashboard', { data: role }]);
  }

  getNotificationsCount() {
    console.log("incoming request");
    this.sharedService.getNotificationsCount().subscribe(res => {
      if (res['success'] == true) {
        console.log("Notifications response:", res['data']);
        this.notificationsCount = res['data'].length ? res['data'].length : 0;
      } else {
        console.log("Error while getting notifications count");
      }
    })
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }

}
