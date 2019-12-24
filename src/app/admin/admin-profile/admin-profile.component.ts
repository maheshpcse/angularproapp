import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  userData: any = [];

  constructor(
    private route: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getUserInfo();
  }

  username: any;
  profileImage: any;
  email: any;
  phoneNumber: any;
  created_on: any;

  getUserInfo() {
    let data = {
      username: sessionStorage.getItem('id')
    }
    this.authService.getUserProfile(data).subscribe(res => {
      if (res['success'] == true) {
        this.userData = res['data'];
        console.log("user data is:", this.userData);
        this.username = this.userData[0].username;
        this.profileImage = this.userData[0].profilePath;
        this.email = this.userData[0].email;
        this.phoneNumber = this.userData[0].phonenumber;
        this.created_on = this.userData[0].created_at;
        console.log("profile image path is:", this.profileImage);
      } else {
        console.log("Error while getting user data");
      }
    })
  }

}
