import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) { }

  getAllTasks() {
    return this.http.get(ApiService.API.GET_ALL_TASKS);
  }
  
}
