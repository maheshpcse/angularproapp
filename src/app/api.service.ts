import { environment } from '../environments/environment';

export class ApiService {
  public static timer = 30000;
  public static API = {
    // DATA APT URL's
    GETDATA: environment.apiUrl + '/getdata',

    // LOGIN and SIGNUP API URL's
    LOGIN: environment.apiUrl + '/login',
    SIGNUP: environment.apiUrl + '/signup',
    VALID_LOGIN: environment.apiUrl + '/validuser',
    GET_USER_PROFILE: environment.apiUrl + '/getuserprofile'
  }
}