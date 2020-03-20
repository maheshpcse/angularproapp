import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { AuthService } from './auth.service';
import { SharedService } from './shared.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AngularPro';
  public role: any = sessionStorage.getItem('role');
  public href: any;
  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.href = this.router.url;
    console.log(this.href);
  }

  ngOnInit() {
  }
}
