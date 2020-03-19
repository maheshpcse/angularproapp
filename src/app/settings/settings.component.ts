import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SharedService } from '../shared.service';
import { SettingsService } from '../settings.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as moment from 'moment';
import * as _ from 'underscore';
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
  checked: boolean;
  spinner: any = false;  
  addAll: boolean;
  updateAll: boolean;
  deleteAll: boolean;
  viewAll: boolean;

  constructor(
    private route: Router,
    private authService: AuthService,
    private sharedService: SharedService,
    private settingsService: SettingsService,
    public toastr: ToastrManager
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
    this.spinner = true;
    this.settingsService.getConfigurations().subscribe(res => {
      if (res['success'] == true) {
        console.log("getting configurations", res['data']);
        this.moduleNames = res['data'];
        let addArr = _.filter(this.moduleNames, (e:any) => {
          return e.addConfig != 0;
        });
        let updateArr = _.filter(this.moduleNames, (e:any) => {
          return e.updateConfig != 0;
        });
        let deleteArr = _.filter(this.moduleNames, (e:any) => {
          return e.deleteConfig != 0;
        });
        let viewArr = _.filter(this.moduleNames, (e:any) => {
          return e.viewConfig != 0;
        });
        this.addAll = this.moduleNames.length === addArr.length ? true : false;
        this.updateAll = this.moduleNames.length === updateArr.length ? true : false;
        this.deleteAll = this.moduleNames.length === deleteArr.length ? true : false;
        this.viewAll = this.moduleNames.length === viewArr.length ? true : false;
        this.spinner = false;
      } else if (res['success'] == false) {
        console.log("Unable to get configurations");
        this.spinner = true;
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
        this.addAll = false;
      }
      if (k == i && event.target.checked == true && config == 'update') {
        this.moduleNames[i].updateConfig = 1;
        this.updatedModules.push(this.moduleNames[i]);
      } else if (k == i && event.target.checked == false && config == 'update') {
        this.moduleNames[i].updateConfig = 0;
        this.updatedModules.push(this.moduleNames[i]);
        this.updateAll = false;
      }
      if (k == i && event.target.checked == true && config == 'delete') {
        this.moduleNames[i].deleteConfig = 1;
        this.updatedModules.push(this.moduleNames[i]);
      } else if (k == i && event.target.checked == false && config == 'delete') {
        this.moduleNames[i].deleteConfig = 0;
        this.updatedModules.push(this.moduleNames[i]);
        this.deleteAll = false;
      }
      if (k == i && event.target.checked == true && config == 'view') {
        this.moduleNames[i].viewConfig = 1;
        this.updatedModules.push(this.moduleNames[i]);
      } else if (k == i && event.target.checked == false && config == 'view') {
        this.moduleNames[i].viewConfig = 0;
        this.updatedModules.push(this.moduleNames[i]);
        this.viewAll = false;
      }
    }
    let addArr = _.filter(this.moduleNames, (e:any) => {
      return e.addConfig != 0;
    });
    let updateArr = _.filter(this.moduleNames, (e:any) => {
      return e.updateConfig != 0;
    });
    let deleteArr = _.filter(this.moduleNames, (e:any) => {
      return e.deleteConfig != 0;
    });
    let viewArr = _.filter(this.moduleNames, (e:any) => {
      return e.viewConfig != 0;
    });
    this.addAll = this.moduleNames.length === addArr.length ? true : false;
    this.updateAll = this.moduleNames.length === updateArr.length ? true : false;
    this.deleteAll = this.moduleNames.length === deleteArr.length ? true : false;
    this.viewAll = this.moduleNames.length === viewArr.length ? true : false;
  }

  selectAllConfig(event: any, config: any) {
    if (event.target.checked == true) {
      for (let k = 0; k<this.moduleNames.length; k++) {
        if (config == 'add') {
          this.moduleNames[k].addConfig = 1;
          this.addAll = true;
        }
        if (config == 'update') {
          this.moduleNames[k].updateConfig = 1;
          this.updateAll = true;
        }
        if (config == 'delete') {
          this.moduleNames[k].deleteConfig = 1;
          this.deleteAll = true;
        }
        if (config == 'view') {
          this.moduleNames[k].viewConfig = 1;
          this.viewAll = true;
        }
      }
    } else if (event.target.checked == false) {
      for (let k = 0; k<this.moduleNames.length; k++) {
        if (config == 'add') {
          this.moduleNames[k].addConfig = 0;
          this.addAll = false;
        }
        if (config == 'update') {
          this.moduleNames[k].updateConfig = 0;
          this.updateAll = false;
        }
        if (config == 'delete') {
          this.moduleNames[k].deleteConfig = 0;
          this.deleteAll = false;
        }
        if (config == 'view') {
          this.moduleNames[k].viewConfig = 0;
          this.viewAll = false;
        }
      }
    }  
  }

  updateConfig() {
    if (this.updatedModules.length <= 0) {
      this.updatedModules = this.moduleNames;
      this.updatedModules.forEach(element => {
        element.role = this.rolename.toLowerCase();
      });
    }
    this.updatedModules.forEach(element => {
      element.role = this.rolename.toLowerCase();
    });
    console.log("update module configurations", this.updatedModules);
    this.settingsService.updateConfigurations(this.updatedModules).subscribe(res => {
      if (res['success'] == true) {
        console.log("Module configurations updated successful");
        this.toastr.successToastr('Module configurations updated successful','',
        {
          toastTimeout: 2000,
          position: 'bottom-center',
          showCloseButton: true,
          animate: 'slideFromLeft'
        });
        this.getConfigurations();
        // this.sharedService.getModulesConfig();
      } else if (res['success'] == false) {
        console.log("Unable to update module configurations");
        this.toastr.errorToastr('Failed to update module configurations', '',
          {
            toastTimeout: 2000,
            position: 'bottom-center',
            showCloseButton: true,
            animate: 'slideFromLeft'
          });
        this.getConfigurations();
        // this.sharedService.getModulesConfig();
      }
    })
  }
}
