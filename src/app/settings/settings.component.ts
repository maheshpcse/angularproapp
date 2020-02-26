import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  public username: any = sessionStorage.getItem('id');
  public role: any = sessionStorage.getItem('role');
  image: any;

  @ViewChild('fileInput', {static: false}) fileInputRef: ElementRef;

  rolename: any;
  roles: any;
  moduleNames: any = [];

  constructor(
    private route: Router,
    private authService: AuthService
  ) { }

  ngOnInit() { 
    this.rolename = this.role;
    this.roles = ['Admin', 'Manager', 'User'];
    this.moduleNames = [
      {name: 'Task Info', type: 'checkbox'},
      {name: 'Forms', type: 'checkbox'},
      {name: 'Test case', type: 'checkbox'},
      {name: 'Sample one', type: 'checkbox'}
    ]
  }

  selectedFile(event) {
    console.log(event.target.files[0]);
    // this.image = <File>event.target.files[0];
    this.image = this.fileInputRef.nativeElement.files[0];
  }

  uploadProfile() {
    const formData = new FormData();
    formData.append('username', this.username);
    formData.set('file', this.image);
    console.log(formData.get('file'));
    let obj = {
      username: this.username
    }
    this.authService.uploadSingle(formData).subscribe(res => {
      if (res['success'] == true) {
        console.log("File upload successful");
      } else {
        console.log("Failed to upload profile");
      }
    })
  }

}
