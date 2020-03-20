import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userData: any = [];
  project: any;
  apiUrl: string;
  userOne: any = {};

  constructor(
    private route: Router,
    private router: ActivatedRoute,
    private authService: AuthService,
    private sanitization: DomSanitizer
  ) {
    this.apiUrl = environment.apiUrl;
    this.router.paramMap.subscribe(res => {
      this.userOne = res['params'];
      console.log(this.userOne);
    });
  }

  ngOnInit() {
    this.getUserInfo();
    // this.router.params.subscribe(res => {
    //   this.userOne = res['item'];
    //   console.log(this.userOne);
    // });
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
    });
  }

  message: any;

  sendMessage() {
    let data = {
      message: this.message
    }
    this.authService.addMessage(data).subscribe(res => {
      if(res['success'] == true) {
        console.log('Message sent successful');
      } else {
        console.log('Failed to send a message');
      }
    });
  }

}
