import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { translate } from 'translate';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public data = 'Getting data';
  public addEnable : any = '';
  public updateEnable: any = '';
  public deleteEnable: any = '';
  public viewEnable: any = '';

  constructor(
    private http: HttpClient,
    private settingsService: SettingsService
  ) { }

  getModuleConfig() {
    this.settingsService.getConfigurations().subscribe(res=>{
      if(res['success'] == true) {

      } else if (res['success'] == false) {

      }
    })
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
