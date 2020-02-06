import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  searchItem: any;
  hiddenItem: any;

  dataItems: any = [];
  searchRes: boolean = false;

  constructor(
    private route: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.dataItems = ['MongoDB', 'ExpressJS', 'Angular', 'Node.JS'];
  }

  data: any = [];

  searchData(val: any) {
    console.log(val);
    for (let i = 0; i < this.dataItems.length; i++) {
      if (val == '' || val == null || val == undefined) {
        this.searchRes = false;
      }
      else if (this.dataItems[i].toLowerCase() == val.toLowerCase()) {
        this.searchRes = true;
        this.data.push(this.dataItems[i]);
      } else {
        this.searchRes = true;
        this.data[0] = 'No data found';
      }
    }
  }
}
