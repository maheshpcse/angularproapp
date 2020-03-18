import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SettingsService } from '../settings.service';

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
    this.settingService.getAllUsers().subscribe(res=>{
      if(res['success'] == true) {
        console.log("Get all users list", res['data']);
        this.usersList = res['data'];
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
    }
    // else if(config == 'block') {

    // } 
    // else if (config == 'unblock') {

    // }
  }

  resetTaskForm() {
    document.getElementById('id01').style.display = "none";
  }
}
