import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  username: any = sessionStorage.getItem('id');
  image: File = null;

  @ViewChild('fileInput', {static: false}) fileInputRef: ElementRef;

  constructor(
    private route: Router,
    private authService: AuthService
  ) { }

  ngOnInit() { }

  selectedFile(event) {
    console.log(event.target.files[0]);
    this.image = <File>event.target.files[0];
    // this.image = this.fileInputRef.nativeElement.files[0];
  }

  uploadProfile() {
    const formData = new FormData();
    formData.append('username', this.username);
    formData.append('file', this.image, this.image.name);
    console.log(formData.get('file'));
    this.authService.uploadProfileImg(formData).subscribe(res => {
      if (res['success'] == true) {
        console.log("File upload successful");
      } else {
        console.log("Failed to upload profile");
      }
    })
  }
}
