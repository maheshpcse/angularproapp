import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import * as $ from 'jquery';
import * as _ from 'underscore';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {

  pageType: any;
  currentUrl: any;
  userData: any = [];

  username: any;
  profileImage: any;
  email: any;
  phoneNumber: any;
  created_on: any;
  // role: any = sessionStorage.getItem('role');
  role: any = sessionStorage.getItem('role');
  data: any;

  public href: string = "";

  public filterQuery = '';
  adminMenu: any = [];
  userMenu: any = [];
  managerMenu: any = [];
  settingsMenu: any = [];

  constructor(
    public _route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    // public ubuntu:
    ) { 
      this.getAllModules();
    }
    
    ngOnInit() {
      this.getUserInfo();
    // this.currentUrl = window.location.href.split('http://localhost:3200/')[1];
    // console.log("current url is", this.currentUrl);
    this.pageType = this._route.snapshot.url[0].path;
    // console.log(this.pageType);

    console.log(this.router.url);
    this.href = this.router.url;
    // this.data = this._route.queryParams.subscribe(res => {
    //   this.role = res['data'];
    // });

    // console.log("getting role is:", this.role);
    // sessionStorage.setItem('role', this.role);
  }

  getAllModules() {
    this.adminMenu = [
      {name: 'Dashboard', icon: 'fa-dashboard', url: '/admin/dashboard'},
      {name: 'Tasks', icon: 'fa-folder-o', url: '/admin/tasks'},
      {name: 'Forms', icon: 'fa-wpforms', url: '/admin/forms'},
      {name: 'Tables', icon: 'fa-table', url: '/admin/tables'},
      {name: 'Visit', icon: 'fa-gear', url: '/admin/companies'},
      {name: '', icon: '', url: '/admin/profile'}
    ];
    this.userMenu = [
      {name: 'Dashboard', icon: 'fa-dashboard', url: '/user/dashboard'},
      {name: 'Services', icon: 'fa-gear', url: '/user/services'},
      {name: 'Chat', icon: 'fa-wpforms', url: '/user/chat'},
      {name: 'Activity', icon: 'fa-table', url: '/user/activities'},
      {name: '', icon: '', url: '/user/profile'}
    ];
    this.managerMenu = [
      {name: 'Dashboard', icon: 'fa-dashboard', url: '/manager/dashboard'},
      {name: 'Attandance', icon: 'fa-gear', url: '/manager/attandance'},
      {name: 'Leaves', icon: 'fa-wpforms', url: '/manager/leaves'},
      {name: 'Accounts', icon: 'fa-table', url: '/manager/accounts'},
      {name: '', icon: '', url: '/manager/profile'}
    ];
    this.settingsMenu = [
      {name: 'Site Info', icon: 'fa-dashboard', url: '/settings/siteinfo'},
      {name: 'Role Privileges', icon: 'fa-users', url: '/settings/roleprivileges'},
      {name: 'Block Chain', icon: 'fa-cube', url: '/settings/blockchain'}
    ];
  }

  getUserInfo() {
    let data = {
      username: sessionStorage.getItem('id')
    }
    this.authService.getUserProfile(data).subscribe(res => {
      if (res['success'] == true) {
        this.userData = res['data'];
        // console.log("user data is:", this.userData);
        this.username = this.userData[0].username;
        this.profileImage = this.userData[0].profilePath;
        this.email = this.userData[0].email;
        this.phoneNumber = this.userData[0].phonenumber;
        this.created_on = this.userData[0].created_at;
        // this.role = this.userData[0].role;
        // console.log("profile image path is:", this.profileImage);
      } else {
        console.log("Error while getting user data");
      }
    })
  }

  backTohome() {
    this.router.navigate(['/admin/dashboard']);
  }

  searchModule() {
    let val = this.filterQuery ? this.filterQuery.toLowerCase() : '';
    if (val == '' || val == null || val == undefined) {
      this.adminMenu = [];
      this.userMenu = [];
      this.managerMenu = [];
      this.settingsMenu = [];
      this.getAllModules();
    } else {
      if (this.role == 'admin') {
        let arr = _.filter(this.adminMenu, (e: any) => {
          if (e.toLowerCase() == val) {
            return e;
          }
          if (e.toLowerCase().includes(val)) {
            return e;
          }
        });
        this.adminMenu = arr;
        return this.adminMenu;
      } else if (this.role == 'user') {
        let arr = _.filter(this.userMenu, (e: any) => {
          if (e.toLowerCase() == val) {
            return e;
          }
          if (e.toLowerCase().includes(val)) {
            return e;
          }
        });
        this.userMenu = arr;
        return this.userMenu;
      } else if (this.role == 'manager') {
        let arr = _.filter(this.managerMenu, (e: any) => {
          if (e.toLowerCase() == val) {
            return e;
          }
          if (e.toLowerCase().includes(val)) {
            return e;
          }
        });
        this.managerMenu = arr;
        return this.managerMenu;
      }
    }
  }
}
