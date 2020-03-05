import { Component, OnInit } from '@angular/core';
import * as _ from 'underscore';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let arr:any = [];
    arr[1] = ['mp4','mp3','avi'];
    arr[3] = ['mkv','flv','flac'];
    console.log(arr);

    let data = _.filter(arr, (e:any)=>{
      return e != undefined;
    });
    console.log(data);
  }

}
