import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { environment } from '../../../environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as $ from 'jquery';
import Handsontable from 'handsontable';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  userData: any = [];
  project: any;
  apiUrl: string;

  data: any[] = [
    {
      timeperiod: '1 -5 years',
      preference: 'daily',
      days: '10'
    },
    {
      timeperiod: '6 - 10 years',
      preference: 'monthly',
      days: '20'
    },
    {
      timeperiod: '11 - 15 years',
      preference: 'yearly',
      days: '30'
    }
  ];

  settings: Object = {
    data: this.data,
    stretchH: 'all',
    width: 1200,
    autoWrapRow: true,
    height: 300,
    rowHeaders: true,
    colHeaders: [
      'TimePeriod',
      'Months',
      'Days'
    ],
    columns: [
      {},
      {
        type: 'dropdown',
        source: ['One month', 'Quaterly', 'Half yearly', 'Yearly']
      },
      {}
    ],
    licenseKey: 'non-commercial-and-evaluation'
  }

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


  }

  firstname: any;
  lastname: any;
  username: any;
  profileImage: any;
  email: any;
  phoneNumber: any;
  designation: any;
  created_on: any;
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

}
