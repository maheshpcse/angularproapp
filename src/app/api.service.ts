import { environment } from '../environments/environment';

export class ApiService {
  public static timer = 30000;
  public static API = {
    // DATA APT URL's
    GETDATA: environment.apiUrl + '/getdata',

    // LOGIN and SIGNUP API URL's
    LOGIN: environment.apiUrl + '/login',
    SIGNUP: environment.apiUrl + '/signup',
    VALID_LOGIN: environment.apiUrl + '/validlogin',
    VALIDATE_USER: environment.apiUrl + '/validateuser',
    CHANGE_PASSWORD: environment.apiUrl + '/changepassword',
    UPLOAD_PROFILE_IMAGE: environment.apiUrl + '/uploadprofile',
    GET_USER_PROFILE: environment.apiUrl + '/getuserprofile',

    // TASKS API URL's
    GET_ALL_TASKS: environment.apiUrl + '/getTasks',
    UPDATE_TASK: environment.apiUrl + '/updateTask'
  }
}