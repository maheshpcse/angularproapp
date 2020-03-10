import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  searchItem: any;
  hiddenItem: any;

  modules: any = [];
  hideData: boolean = false;
  data: any = [];

  constructor(
    private route: Router,
    private _route: ActivatedRoute,
    private authService: AuthService
  ) { 
    this._route.params.subscribe(res => {
      console.log(res['data']);
    });
  }

  ngOnInit() {
    this.getModules();
  }

  getModules() {
    this.modules = ['Dashboard', 'Tasks', 'Forms', 'Tables', 'Visit'];
  }

  searchData() {
    console.log(this.searchItem);
    let val = this.searchItem.toLowerCase();
    if (val == '' || val == null || val == undefined) {
      this.hideData = true;
      this.modules = [];
      return;
    } else {
      this.hideData = false;
      this.modules = ['Dashboard', 'Tasks', 'Forms', 'Tables', 'Visit'];
      let arr = _.filter(this.modules, (e: any) => {
        if (e.toLowerCase() == val) {
          return e;
        } else if (e.toLowerCase().includes(val)) {
          return e;
        }
      });
      this.modules = arr;
      return this.modules;
    }
  }

  onCompleted() {
    this.route.navigate(['/your route', { data: 'completed' }]);
  }
}
