import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  username: any;
  password: any;
  confirmpassword: any;

  isChange: boolean = true;
  isSubmit: boolean = false;

  isSuccess: boolean = false;
  isFalied: boolean = false;
  isInfo: boolean = false;
  isWarning: boolean = false;

  constructor(
    private route: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }


  user_id: any;

  validateUser() {
    if (this.username == '' || this.username == null || this.username == undefined) {
      this.isInfo = true;
    } else {
      let userData = {
        username: this.username
      }
      this.authService.validateUser(userData).subscribe(res => {
        console.log("response is:", res);
        if (res['success'] == true) {
          this.user_id = res['data'][0].user_id;
          console.log("userid is:", this.user_id);
          this.isChange = false;
          this.isSubmit = true;
        } else if(res['statusCode'] == 404) {
          this.isFalied = true;
        } else {
          this.isFalied = true;
        }
      })
    }
  }

  submitPassword() {
    if ((this.password == '' || this.password == null || this.password == undefined) ||
      (this.confirmpassword == '' || this.confirmpassword == null || this.confirmpassword == undefined)) {
      this.isInfo = true;
    } else if (this.password != this.confirmpassword) {
      this.isWarning = true;
    } else {
      let userData = {
        user_id: this.user_id,
        password: this.password
      }
      this.authService.forgotPassword(userData).subscribe(res => {
        console.log("response is:", res);
        if (res['success'] == true) {
          this.isSuccess = true;
          setTimeout(()=>{
            this.route.navigate(['']);
          },1000)
        } else {
          this.isFalied = true;
        }
      })
    }
  }

}
