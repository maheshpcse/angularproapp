import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private authService: AuthService,
    private route: Router
  ) { }

  canActivate():boolean {
    if(!this.authService.isLoggedIn()) {
      this.route.navigate(['']);
      return false;
    } else {
      return true;
    }
  }
}
