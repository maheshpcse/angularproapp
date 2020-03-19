import { Component, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';
import { Router, ActivatedRoute } from '@angular/router';
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
  public userid = sessionStorage.getItem('userid');
  public role = sessionStorage.getItem('role');
  public roles: any = [];
  public rolesArr: any = [];

  subscription: Subscription;
  notificationsCount: any = 0;
  notifications: any = [];
  hiddenNotify: boolean = false;

  currentUrl: any;
  languages: any = [];
  public activeLanguage = 'en-Us';
  public href: string = "";
  public hideSwitch: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    public sharedService: SharedService
  ) { }

  ngOnInit() {
    $("#menu-toggle").click(function (e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
    // console.log("curret role is:", this.role);

    this.getUserInfo();

    this.currentUrl = this.route.snapshot.url[0].path;
    // console.log("current url is", this.currentUrl);
    // this.subscription = timer(0, 10000).pipe(
    //   switchMap(() => this.sharedService.getNotificationsCount())
    // ).subscribe(res => {
    //   if (res['success'] == true) {
    //     console.log("Notifications count is:", res['data']);
    //     if (this.currentUrl != 'notifications') {
    //       this.notificationsCount = res['data'].length ? res['data'].length : 0;
    //       this.notifications = res['data'];
    //     } else {
    //       this.notificationsCount = 0;
    //     }
    //   } else {
    //     console.log("Error while getting notifications count");
    //   }
    // })
    this.languages = [
      {code: 'en-Us', language: 'English'},
      {code: 'ar-AE', language: 'Arabic'}
    ];

    this.href = this.router.url;
    console.log(this.router.url);
    if(this.href.includes('/settings')) {
      this.hideSwitch = true;
    } else {
      this.hideSwitch = false;
    }
  }

  switchLanguage(item: any) {

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
    console.log(this.userid);
    this.authService.userLogout({ user_id: this.userid }).subscribe(res => {
      console.log('User is logged out');
      this.router.navigate(['']);
    })
  }

  getUserInfo() {
    let data = {
      username: sessionStorage.getItem('id')
    }
    this.authService.getUserProfile(data).subscribe(res => {
      if (res['success'] == true) {
        this.userData = res['data'];
        console.log("user data is:", this.userData);
        let role = this.userData[0].role;
        for (let i = 0; i < this.userData.length; i++) {
          this.roles.push(this.userData[i].assigned_roles.split(','));
        }
        for (let i = 0; i < this.roles[0].length; i++) {
          this.rolesArr.push(this.roles[0][i]);
        }
        this.rolesArr.push(role);
        // console.log("roles is:", this.rolesArr);
      } else {
        console.log("Error while getting user data");
      }
    })
  }

  changeRole(role: any) {
    console.log("get role is:", role);
    sessionStorage.setItem('role', role);
    this.router.navigate([`${role}/dashboard`]);
    // window.location.reload();
    // this.route.navigate(['/dashboard', { data: role }]);
  }

  notifyList() {
    this.hiddenNotify = true;
    $('data')
  }

  viewNotifications() {
    this.router.navigate(['/notifications']);
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
}
