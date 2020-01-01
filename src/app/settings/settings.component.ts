import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  username: any = sessionStorage.getItem('id');
  fileSrc: File = null;
  formData: FormData = new FormData();
  @ViewChild("fileInput", { static: false }) fileInputRef: ElementRef;

  constructor(
    private route: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    // console.log("username is: ", this.username);
  }

  selectedFile(event: FileList) {
    // console.log(event.target.files[0]);
    this.fileSrc = event.item(0);
    this.formData.append('avatar', this.fileSrc, this.fileSrc.name);
  }

  uploadProfile() {
    console.log(this.formData.get('avatar'));
    let obj = {
      username: this.username
    }
    this.authService.uploadProfileImg(obj, this.formData).subscribe(res => {
      if (res['success'] == true) {
        console.log("File upload successful");
      } else {
        console.log("Failed to upload profile");
      }
    })
  }

}
