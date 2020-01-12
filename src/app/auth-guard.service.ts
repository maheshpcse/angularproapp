import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  userId = sessionStorage.getItem('id');
  role = sessionStorage.getItem('role');

  constructor(
    private authService: AuthService,
    private route: Router,
    private _route: ActivatedRoute
  ) { }

  canActivate(): boolean {
    if (!this.authService.isLoggedIn()) {
      this.route.navigate(['']);
      return false;
    } else {
      // return true;
      if(this.role == 'admin' || this.role == 'user' || this.role == 'manager') {
        return true;
      } else {
        this.route.navigate(['']);
        return false;
      }
    }
  }
}
