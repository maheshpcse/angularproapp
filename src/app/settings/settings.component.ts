import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import * as $ from 'jquery';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  username: any = sessionStorage.getItem('id');
  image: any;

  constructor(
    private route: Router,
    private authService: AuthService
  ) {

  }

  ngOnInit() {

  }

  selectedFile(event) {
    console.log(event.target.files[0]);
    this.image = event.target.files[0];
  }

  uploadProfile() {
    const formData = new FormData();
    formData.append('file', this.image);
    console.log(formData.get('file'));
    let obj = {
      username: this.username
    }
    this.authService.uploadProfileImg(obj, formData).subscribe(res => {
      if (res['success'] == true) {
        console.log("File upload successful");
      } else {
        console.log("Failed to upload profile");
      }
    })
  }

}
