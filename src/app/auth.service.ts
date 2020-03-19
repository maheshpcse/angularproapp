import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getDbConnection() {
    return this.http.get(ApiService.API.GET_DB_CONNECTION);
  }

  getData() {
    return this.http.get(ApiService.API.GET_API_WORK);
  }

  userLogin(data) {
    console.log(data);
    return this.http.post<any>(ApiService.API.LOGIN, data);
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

  forgotPassword(data) {
    return this.http.post(ApiService.API.FORGOT_PASSWORD, data);
  }

  uploadSingle(data) {
    return this.http.post<any>(ApiService.API.UPLOAD_SINGLE_IMAGE, data);
  }

  uploadMultiple(data) {
    return this.http.post<any>(ApiService.API.UPLOAD_MULTIPLE_IMAGES, data);
  }

  getAllUsers() {
    return this.http.get(ApiService.API.GET_USERS_LIST);
  }

  getUserProfile(id) {
    return this.http.post(ApiService.API.GET_USER_PROFILE, id);
  }

  getUsersprofiles(id) {
    return this.http.post(ApiService.API.GET_USERS_PROFILES, id);
  }

  addMessage(data) {
    return this.http.post(ApiService.API.SEND_MESSAGE, data);
  }

  userLogout(data) {
    return this.http.post(ApiService.API.USER_LOGOUT, data);
  }

}
