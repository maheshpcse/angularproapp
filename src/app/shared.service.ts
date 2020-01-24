import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { translate } from 'translate';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public data = 'Getting data';

  constructor(private http: HttpClient) { }

  getDbConnection() {
    return this.http.get(ApiService.API.GET_DB_CONNECTION);
  }

  getAllTasks() {
    return this.http.get(ApiService.API.GET_ALL_TASKS);
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
