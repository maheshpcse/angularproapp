import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {

  pageType: any;

  constructor(public _route: ActivatedRoute) { }

  ngOnInit() {
    this.pageType = this._route.snapshot.url[0].path;
    console.log(this.pageType);
  }

}
