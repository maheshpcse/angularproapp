import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { environment } from '../../../environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as $ from 'jquery';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  userData: any = [];
  project: any;
  apiUrl: string;

  constructor(
    private route: Router,
    private authService: AuthService,
    private sanitization: DomSanitizer
  ) {
    this.apiUrl = environment.apiUrl;
  }

  ngOnInit() {
    this.getUserInfo();
  }

  username: any;
  profileImage: any;
  email: any;
  phoneNumber: any;
  created_on: any;
  imgSrc: SafeResourceUrl;

  getUserInfo() {
    let data = {
      username: sessionStorage.getItem('id')
    }
    this.authService.getUserProfile(data).subscribe((res: any) => {
      console.log("response:", res);
      if (res['success'] == true) {
        this.userData = res['data'];
        console.log("user data is:", this.userData);
        this.username = this.userData[0].username;
        this.email = this.userData[0].email;
        this.phoneNumber = this.userData[0].phonenumber;
        this.created_on = this.userData[0].created_at;
        this.profileImage = this.userData[0].profilePath;
        // this.profileImage = atob(res['file']);
        this.imgSrc = this.sanitization.bypassSecurityTrustResourceUrl('data:image/*;base64,' + this.profileImage);
        // this.imgSrc = 'data:image/*;base64' + (this.sanitization.bypassSecurityTrustResourceUrl(this.profileImage) as any).changingThisBreaksApplicationSecurity;
        // console.log("profile image path is:", this.imgSrc);
      } else {
        console.log("Error while getting user data");
      }
    })
  }

}
