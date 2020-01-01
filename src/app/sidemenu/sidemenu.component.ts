import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {

  pageType: any;
  userData: any = [];

  username: any;
  profileImage: any;
  email: any;
  phoneNumber: any;
  created_on: any;
  // role: any = sessionStorage.getItem('role');
  role: any;
  data: any;

  constructor(
    public _route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.pageType = this._route.snapshot.url[0].path;
    console.log(this.pageType);
    this.getUserInfo();

    // this.data = this._route.queryParams.subscribe(res => {
    //   this.role = res['data'];
    // });

    // console.log("getting role is:", this.role);
    // sessionStorage.setItem('role', this.role);
  }

  ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.

    // this.data = this._route.queryParams.subscribe(res => {
    //   this.role = res['data'];
    // });
    // console.log("getting role is:", this.role);
    // return sessionStorage.setItem('role', this.role);
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
        this.role = this.userData[0].role;
        // console.log("profile image path is:", this.profileImage);
      } else {
        console.log("Error while getting user data");
      }
    })
  }
}
