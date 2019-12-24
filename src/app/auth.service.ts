import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(ApiService.API.GETDATA);
  }

  userLogin(data) {
    return this.http.post(ApiService.API.LOGIN, data);
  }

  userSignup(data) {
    return this.http.post(ApiService.API.SIGNUP, data);
  }

  getUserToken() {
    return localStorage.getItem('token');
  }

  getUserId() {
    return sessionStorage.getItem('id');
  }

  getUserRole() {
    return sessionStorage.getItem('role');
  }

  getUserPayload() {
    var token = this.getUserToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn(): boolean {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }

  validateUser(data) {
    return this.http.post(ApiService.API.VALIDATE_USER, data);
  }

  changePassword(data) {
    return this.http.post(ApiService.API.CHANGE_PASSWORD, data);
  }

  uploadProfileImg(data) {
    return this.http.post(ApiService.API.UPLOAD_PROFILE_IMAGE, data);
  }

  getUserProfile(id) {
    return this.http.post(ApiService.API.GET_USER_PROFILE, id);
  }
}
