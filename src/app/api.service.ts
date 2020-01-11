import { environment } from '../environments/environment';

export class ApiService {
  public static timer = 30000;
  public static API = {
    // DATA APT URL's
    GET_DB_CONNECTION: environment.apiUrl + '/server',
    GETDATA: environment.apiUrl + '/getdata',

    // LOGIN and SIGNUP API URL's
    LOGIN: environment.apiUrl + '/login',
    SIGNUP: environment.apiUrl + '/signup',
    VALID_LOGIN: environment.apiUrl + '/validlogin',
    VALIDATE_USER: environment.apiUrl + '/validateuser',
    FORGOT_PASSWORD: environment.apiUrl + '/forgotpassword',
    
    // USERS API URLS's
    GET_USER_PROFILE: environment.apiUrl + '/getuserprofile',
    GET_USERS_PROFILES: environment.apiUrl + '/getusersprofiles',
    UPLOAD_SINGLE_IMAGE: environment.apiUrl + '/uploadsingle',
    UPLOAD_MULTIPLE_IMAGES: environment.apiUrl + '/uploadmultiple',
    CHANGE_PASSWORD: environment.apiUrl + '/changepassword',

    // TASKS API URL's
    GET_ALL_TASKS: environment.apiUrl + '/getTasks',
    UPDATE_TASK: environment.apiUrl + '/updateTask',
    DELETE_TASK: environment.apiUrl + '/deleteTask'
  }
}