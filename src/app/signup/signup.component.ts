import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  username: any;
  email: any;
  password: any;
  confirmpassword: any;
  phonenumber: number;

  constructor(
    private route: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    // Get the modal
    var modal = document.getElementById('id01');

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }

  isSuccess: boolean = false;
  isFalied: boolean = false;
  isInfo: boolean = false;
  isWarning: boolean = false;

  userSignup() {
    if ((this.username == '' || this.email == '' || this.password == '' || this.confirmpassword == '' || this.confirmpassword == '') ||
      (this.username == undefined || this.email == undefined || this.password == undefined || this.confirmpassword == undefined || this.confirmpassword == undefined) ||
      (this.username == null || this.email == null || this.password == null || this.confirmpassword == null || this.confirmpassword == null)) {
      this.isInfo = true;
      setInterval(() => {
        this.isInfo = false;
      }, 1000);
    }
    else if (this.password != this.confirmpassword) {
      this.isFalied = true;
      setInterval(() => {
        this.isFalied = false;
      }, 1000);
    } else {
      let userData = {
        username: this.username,
        email: this.email,
        password: this.password,
        phonenumber: this.phonenumber
      }
      console.log("userdata is:", userData);
      this.authService.userSignup(userData).subscribe(res => {
        console.log("response is:", res);
        if (res['success'] == true) {
          console.log("Signup succcessful");
          this.isSuccess = true;
          this.route.navigate(['']);
        } else {
          console.log("Signup failed");
          this.isWarning = true;
          setInterval(() => {
            this.isWarning = false;
          }, 1000);
        }
      })
    }
  }

}
