import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SettingsService } from '../settings.service';
import * as moment from 'moment';
import * as _ from 'underscore';
@Component({
  selector: 'app-block-chain',
  templateUrl: './block-chain.component.html',
  styleUrls: ['./block-chain.component.css']
})
export class BlockChainComponent implements OnInit {

  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'asc';
  
  usersList: any = [];
  public spinner: any;
  selectedAll: boolean = false;
  hideBlock: boolean = false;
  finalObj = {};
  userOne:any = {};

  constructor(
    private route: Router,
    public authService: AuthService,
    public sharedService: SharedService,
    public settingService: SettingsService,
    public toastr: ToastrManager
  ) { }

  ngOnInit() {
    this.getUsersList();
  }

  getUsersList() {
    this.spinner = true;
    this.settingService.getAllUsers().subscribe(res => {
      if (res['success'] == true) {
        console.log("Get all users list", res['data']);
        this.usersList = res['data'];
        this.usersList = _.filter(this.usersList, (e: any) => {
          return e.role != 'admin';
        })
        let arr = [];
        this.usersList.forEach(element => {
          element.checked = false;
          arr.push(element);
        });
        this.usersList = arr;
        this.spinner = false;
      } else if (res['success'] == false) {
        console.log("Unable to get users list");
        this.spinner = true;
      }
    })
  }

  myFunction() {
    var x = document.getElementById("Demo");
    if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
    } else {
      x.className = x.className.replace(" w3-show", "");
    }
  }

  editUser(item: any, config: any) {
    if(config == 'view') {
      document.getElementById('id01').style.display = 'block';
      this.userOne = item;
      console.log(this.userOne);
    }
    else if(config == 'block') {
      this.hideBlock = false;
      document.getElementById('id02').style.display = 'block';
      this.finalObj = {
        user_id: item.user_id,
        status: 'Inactive',
        configure: 'Blocked'
      }
    } 
    else if (config == 'unblock') {
      this.hideBlock = true;
      document.getElementById('id02').style.display = 'block';
      this.finalObj = {
        user_id: item.user_id,
        status: 'Inactive',
        configure: 'Unblocked'
      }
    }
  }

  updateUser() {
    this.settingService.updatedUserStatus(this.finalObj).subscribe(res => {
      if (res['success'] == true) {
        console.log('User status changed success');
        this.toastr.successToastr(res['message'], '',
        {
          toastTimeout: 2000,
          position: 'bottom-center',
          showCloseButton: true,
          animate: 'slideFromLeft'
        });
        document.getElementById('id02').style.display = "none";
      } else if (res['success'] == false) {
        this.toastr.errorToastr(res['message'],'',
        {
          toastTimeout: 2000,
          position: 'bottom-center',
          showCloseButton: true,
          animate: 'slideFromLeft'
        });
        document.getElementById('id02').style.display = "none";
      }
    })
  }

  resetUser() {
    document.getElementById('id01').style.display = "none";
    document.getElementById('id02').style.display = "none";
  }

  selectAll(event: any){
    if (event.target.checked == true) {
      this.selectedAll = true;
      this.usersList.forEach(element => {
        element.checked = true;
      });
    } else {
      this.selectedAll = false;
      this.usersList.forEach(element => {
        element.checked = false;
      });
    }
  }

  selectOne(event: any, index: any) {
    if (event.target.checked == false) {
      this.selectedAll = false;
      this.usersList[index].checked = false;
    } else if (event.target.checked == true) {
      this.usersList[index].checked = true;
      console.log(this.usersList[index]);
    }
    console.log(this.usersList);
    let arr = _.filter(this.usersList, (e:any) => {
      return e.checked == true;
    });
    this.selectedAll = this.usersList.length === arr.length ? true : false;
  }
}
