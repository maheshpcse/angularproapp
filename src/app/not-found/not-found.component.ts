import { Component, OnInit } from '@angular/core';
import { Subscription, timer, pipe } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  subscription: Subscription;
  public role = sessionStorage.getItem('role');
  public url: any;
  public pageType: any;

  constructor(
    private route: Router,
    private authService: AuthService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    // this.pageType = this._route.snapshot.url[0].path;
    if (this.role == '' || this.role == null) {
      this.url = 'login';
      this.pageType = 'Login';
      console.log("current url issssss:", this.url);
    } else {
      this.url = `${this.role}/dashboard`;
      this.pageType = 'Dashboard';
      console.log("current url is:", this.url);
    }

    this.subscription = timer(0, 5000).pipe(
      switchMap(() => this.authService.getDbConnection())
    ).subscribe(res => {
      console.log("server connection checking", res);
      console.log(res['data']);
    });
  }

}
