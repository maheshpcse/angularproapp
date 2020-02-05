import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications: any = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    public sharedService: SharedService
  ) { }

  ngOnInit() {
    this.getNotificationsData();
  }

  getNotificationsData() {
    this.sharedService.getNotificationsCount().subscribe(res => {
      if(res['success'] == true) {
        console.log("response is:", res['data']);
        this.notifications = res['data'];
      } else {
        console.log("Error while getting notifications");
      }
    })
  }

}
