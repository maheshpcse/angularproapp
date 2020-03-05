import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { environment } from '../../../environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as $ from 'jquery';
import Handsontable from 'handsontable';
import * as _ from 'underscore';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  userData: any = [];
  project: any;
  apiUrl: string;

  data: any = [];
  settings: any = {};
  isValid: any = true;

  // dataset: any[] = [
  //   {id: 1, name: 'Ted Right', address: 'Wall Street'},
  //   {id: 2, name: 'Frank Honest', address: 'Pennsylvania Avenue'},
  //   {id: 3, name: 'Joan Well', address: 'Broadway'},
  //   {id: 4, name: 'Gail Polite', address: 'Bourbon Street'},
  //   {id: 5, name: 'Michael Fair', address: 'Lombard Street'},
  //   {id: 6, name: 'Mia Fair', address: 'Rodeo Drive'},
  //   {id: 7, name: 'Cora Fair', address: 'Sunset Boulevard'},
  //   {id: 8, name: 'Jack Right', address: 'Michigan Avenue'},
  // ];

  constructor(
    private route: Router,
    private authService: AuthService,
    private sanitization: DomSanitizer
  ) {
    this.apiUrl = environment.apiUrl;
  }

  ngOnInit() {
    this.getUserInfo();
    this.getUsersInfo();

    this.data = [
      ['One month', '10', ''],
      ['Quaterly', '20', ''],
      ['', '30', ''],
      ['Yearly', '40', '']
    ];

    const that = this;

    this.settings = {
      data: this.data,
      stretchH: 'all',
      width: 1200,
      autoWrapRow: true,
      height: 300,
      rowHeaders: true,
      colHeaders: [
        'Months',
        'Days',
        'TimePeriod'
      ],
      columns: [
        {
          type: 'dropdown',
          source: ['One month', 'Quaterly', 'Half yearly', 'Yearly']
        },
        {
          type: 'dropdown',
          source: ['10', '20', '30', '40']
        },
        {
          type: 'text'
        }
      ],
      beforeChange: (value: any, changes: any, sources: any)=>{
        console.log(value);
      },
      afterChange: (value: any, changes: any, sources: any)=>{
        console.log(value);
        that.getData(value);
      },
      licenseKey: 'non-commercial-and-evaluation'
    }
  }

  value: any;
  getData(value: any) {
    console.log(value, "index-->", value[0][0], "data-->", this.data[value[0][0]][0]);
    this.value = value;
  }

  OnClickData() {
    console.log(this.data);
    if (this.value != null || this.value != undefined) {
      for (let i=0; i<this.data.length; i++) {
        if (this.data[i][0] != '' && this.data[i][1] != '' && this.data[i][2] != '') {
          console.log('entered if', this.data[i][0], this.data[i][1], this.data[i][2]);
          this.isValid = false;
        } else {
          console.log('entered else', this.data[i][0], this.data[i][1], this.data[i][2]);
          this.isValid = true;
        }
      }
    }
  }

  firstname: any;
  lastname: any;
  username: any;
  profileImage: any;
  email: any;
  phoneNumber: any;
  designation: any;
  department: any;
  created_on: any;
  role: any;
  imgSrc: SafeResourceUrl;
  textData: any;
  pdfData: any;
  excelData: any = [];
  headersArr: any = [];

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
        this.firstname = this.userData[0].firstname;
        this.lastname = this.userData[0].lastname;
        this.username = this.userData[0].username;
        this.email = this.userData[0].email;
        this.phoneNumber = this.userData[0].phonenumber;
        this.designation = this.userData[0].designation;
        this.department = this.userData[0].department;
        this.role = this.userData[0].role;
        this.created_on = this.userData[0].created_at;
        if (extName == 'jpg' || extName == 'png' || extName == 'gif' || extName == 'JPEG' || extName == 'PNG' || extName == 'GIF') {
          this.profileImage = res['file'];
          this.imgSrc = this.sanitization.bypassSecurityTrustResourceUrl('data:image/*;base64,' + `${this.profileImage}`);
        }
        else if (extName == 'txt' || extName == 'TXT') {
          this.textData = res['file'];
        }
        else if (extName == 'pdf' || extName == 'PDF') {
          this.pdfData = res['file'];
          console.log("type of pdf data is:", typeof (this.pdfData));
        }
        else if (extName == 'xlsx' || extName == 'xls' || extName == 'XLSX' || extName == 'XLS') {
          this.excelData = res['file'];
          this.headersArr = res['thead'];
        }
        else {
          console.log("No file data is found");
        }
      } else {
        console.log("Error while getting user data");
      }
    })
  }

  ImagesSrc: SafeResourceUrl;
  filesArr: any = [];
  profilesArr = [];

  getUsersInfo() {
    let data = {
      username: sessionStorage.getItem('id')
    }
    this.authService.getUsersprofiles(data).subscribe((res: any) => {
      console.log("response:", res);
      if (res['success'] == true) {
        this.userData = res['data'];
        this.filesArr = res['files'];
        console.log("user data is:", this.userData);
        for (let i = 0; i < this.filesArr.length; i++) {
          this.ImagesSrc = this.sanitization.bypassSecurityTrustResourceUrl('data:image/*;base64,' + `${this.filesArr[i]}`);
          this.profilesArr.push(this.ImagesSrc);
        }
      } else {
        console.log("Error while getting user data");
      }
    })
  }

  onDataSubmit() {
    console.log(this.data);
  }
}
