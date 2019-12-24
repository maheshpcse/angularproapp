import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userData: any = [];

  constructor(
    private route: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    $("#menu-toggle").click(function (e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
    this.getUserInfo();
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
      if(res['success'] == true) {
        this.userData = res['data'];
        // console.log("user data is:", this.userData);
      } else {
        console.log("Error while getting user data");
      }
    })
  }

}
