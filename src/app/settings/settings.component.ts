import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SharedService } from '../shared.service';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  public username: any = sessionStorage.getItem('id');
  public role: any = sessionStorage.getItem('role');
  image: any;

  @ViewChild('fileInput', { static: false }) fileInputRef: ElementRef;

  rolename: any;
  roles: any;
  moduleNames: any = [];
  updatedModules: any = [];
  addChecked: boolean = false;
  updateChecked: boolean = false;
  deletedChecked: boolean = false;
  viewChecked: boolean = false;

  constructor(
    private route: Router,
    private authService: AuthService,
    private sharedService: SharedService,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.rolename = this.role;
    this.roles = ['Admin', 'Manager', 'User'];
    // this.moduleNames = [
    //   {name: 'Task Info', type: 'checkbox'},
    //   {name: 'Forms', type: 'checkbox'},
    //   {name: 'Test case', type: 'checkbox'},
    //   {name: 'Sample one', type: 'checkbox'}
    // ]
    this.getConfigurations();
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

  getConfigurations() {
    this.settingsService.getConfigurations().subscribe(res => {
      if (res['success'] == true) {
        console.log("getting configurations", res['data']);
        this.moduleNames = res['data'];
      } else if (res['success'] == false) {
        console.log("Unable to get configurations");
      }
    })
  }

  selectConfig(event: any, i: any, config: any) {
    this.updatedModules = [];
    for (let k = 0; k < this.moduleNames.length; k++) {
      if (k == i && event.target.checked == true && config == 'add') {
        this.moduleNames[i].addConfig = 1;
        this.updatedModules.push(this.moduleNames[i]);
      } else if (k == i && event.target.checked == false && config == 'add') {
        this.moduleNames[i].addConfig = 0;
        this.updatedModules.push(this.moduleNames[i]);
      }
      if (k == i && event.target.checked == true && config == 'update') {
        this.moduleNames[i].updateConfig = 1;
        this.updatedModules.push(this.moduleNames[i]);
      } else if (k == i && event.target.checked == false && config == 'update') {
        this.moduleNames[i].updateConfig = 0;
        this.updatedModules.push(this.moduleNames[i]);
      }
      if (k == i && event.target.checked == true && config == 'delete') {
        this.moduleNames[i].deleteConfig = 1;
        this.updatedModules.push(this.moduleNames[i]);
      } else if (k == i && event.target.checked == false && config == 'delete') {
        this.moduleNames[i].deleteConfig = 0;
        this.updatedModules.push(this.moduleNames[i]);
      }
      if (k == i && event.target.checked == true && config == 'view') {
        this.moduleNames[i].viewConfig = 1;
        this.updatedModules.push(this.moduleNames[i]);
      } else if (k == i && event.target.checked == false && config == 'view') {
        this.moduleNames[i].viewConfig = 0;
        this.updatedModules.push(this.moduleNames[i]);
      }
    }
  }

  selectAllConfig(event: any, config: any) {
    if (event.target.checked == true) {
      for (let k = 0; k<this.moduleNames.length; k++) {
        if (config == 'add') {
          this.moduleNames[k].addConfig = 1;
        }
        if (config == 'update') {
          this.moduleNames[k].updateConfig = 1;
        }
        if (config == 'delete') {
          this.moduleNames[k].deleteConfig = 1;
        }
        if (config == 'view') {
          this.moduleNames[k].viewConfig = 1;
        }
      }
    } else if (event.target.checked == false) {
      for (let k = 0; k<this.moduleNames.length; k++) {
        if (config == 'add') {
          this.moduleNames[k].addConfig = 0;
        }
        if (config == 'update') {
          this.moduleNames[k].updateConfig = 0;
        }
        if (config == 'delete') {
          this.moduleNames[k].deleteConfig = 0;
        }
        if (config == 'view') {
          this.moduleNames[k].viewConfig = 0;
        }
      }
    }  
  }

  updateConfig() {
    if (this.updatedModules.length <= 0) {
      this.updatedModules = this.moduleNames;
    }
    console.log("update module configurations", this.updatedModules);
    this.settingsService.updateConfigurations(this.updatedModules).subscribe(res => {
      if (res['success'] == true) {
        console.log("Module configurations updated successful");
        this.getConfigurations();
      } else if (res['success'] == false) {
        console.log("Unable to update module configurations");
        this.getConfigurations();
      }
    })
  }
}
