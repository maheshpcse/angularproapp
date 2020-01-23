import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { translate } from 'translate';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) { }

  getAllTasks() {
    return this.http.get(ApiService.API.GET_ALL_TASKS);
  }

  updateTask(data) {
    return this.http.post(ApiService.API.UPDATE_TASK, data);
  }

  deleteTask(data) {
    return this.http.post(ApiService.API.DELETE_TASK, data);
  }

  translateOf(word: String) {
    const state: any = 'AP';
    if (state == 'AP') {
      translate(word, { from: 'ja', to: 'es' }).then(text => {
        console.log(text);
        word = text;
      });
    } else if (state)

    return word;
  }
  
}
