import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { translate } from 'translate';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService implements OnInit {

  public data = 'Getting data';
  public addEnable: any;
  public updateEnable: any;
  public deleteEnable: any;
  public viewEnable: any = true;
  public modulesConfig: any = [];
  public moduless: any = [];

  constructor(
    private http: HttpClient,
    public settingsService: SettingsService
  ) { }

  ngOnInit () {
    this.getModulesConfig();
  }

  getModulesConfig() {
    this.settingsService.getConfigurations().subscribe(res => {
      if (res['success'] == true) {
        console.log("Module configurations", res['data']);
        this.modulesConfig = res['data'];
        // this.addEnable = res['data'][0].addConfig;
        // this.updateEnable = res['data'][0].updateConfig;
        // this.deleteEnable = res['data'][0].deleteConfig;
        // this.viewEnable = res['data'][0].viewConfig;
      } else if (res['success'] == false) {
        console.log("Unable to get module configurations");
      }
      // console.log("this.viewEnable value is:", this.viewEnable);
      // return this.viewEnable;
    });
  }

  getModulesData() {
    this.moduless = ["Forms", "Tasks", "Tables", "Settings"];
    console.log("this.modules data:", this.moduless);
  }

  getData(moduleName: any) {
    // console.log("this.modulesConfig data:", this.modulesConfig);
    // data = this.viewEnable;
    // for (let i = 0; i < this.modulesConfig.length; i++) {
    //   if (this.modulesConfig[i].config_name == moduleName && this.modulesConfig[i].viewConfig == 1) {
    //     console.log("entered if");
    //     this.viewEnable = true;
    //   } else {
    //     console.log("entered else");
    //     this.viewEnable = false;
    //   }
    // }
    moduleName = this.moduless;
    return moduleName;
  }

  addDatatoDowload(data) {
    console.log(data);
    return this.http.post(ApiService.API.ADD_DATA_TO_DOWNLOAD, data);
  }

  getDbConnection() {
    return this.http.get(ApiService.API.GET_DB_CONNECTION);
  }

  getAllTasks() {
    return this.http.get(ApiService.API.GET_ALL_TASKS);
  }

  addTask(data: any) {
    return this.http.post(ApiService.API.ADD_TASK, data);
  }

  updateTask(data) {
    return this.http.post(ApiService.API.UPDATE_TASK, data);
  }

  deleteTask(data) {
    return this.http.post(ApiService.API.DELETE_TASK, data);
  }

  // language translation based on change of state

  translation(word: String) {
    const state: any = 'AP';
    // if (state == 'AP') {
    //   translate(word, { from: 'ja', to: 'es' }).then(text => {
    //     console.log(text);
    //     word = text;
    //   });
    // } else if (state == 'TN') {
    //   translate(word, { from: '', to: '' }).then(text => {
    //     console.log(text);
    //     word = text;
    //   });
    // } else if (state == 'KR') {
    //   translate(word, { from: '', to: '' }).then(text => {
    //     console.log(text);
    //     word = text;
    //   });
    // } else if (state == 'KN') {
    //   translate(word, { from: '', to: '' }).then(text => {
    //     console.log(text);
    //     word = text;
    //   });
    // }
    return word;
  }

  // notifications count based on day occation, new message sent by the authorization user

  getNotificationsCount() {
    return this.http.get(ApiService.API.GET_NOTIFICATIONS_COUNT);
  }
}
