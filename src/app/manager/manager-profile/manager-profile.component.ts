import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-manager-profile',
  templateUrl: './manager-profile.component.html',
  styleUrls: ['./manager-profile.component.css']
})
export class ManagerProfileComponent implements OnInit {

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
        let extName = res['ext'];
        console.log("user data is:", this.userData);
        console.log("File extension name is:", extName);
        this.username = this.userData[0].username;
        this.email = this.userData[0].email;
        this.phoneNumber = this.userData[0].phonenumber;
        this.created_on = this.userData[0].created_at;
        if (extName == 'jpg' || extName == 'png' || extName == 'gif' || extName == 'JPEG' || extName == 'PNG' || extName == 'GIF') {
          this.profileImage = res['file'];
          this.imgSrc = this.sanitization.bypassSecurityTrustResourceUrl('data:image/*;base64,' + `${this.profileImage}`);
        }
        else {
          console.log("No file data is found");
        }
      } else {
        console.log("Error while getting user data");
      }
    })
  }

}
