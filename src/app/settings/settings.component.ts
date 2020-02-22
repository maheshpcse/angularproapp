import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  username: any = sessionStorage.getItem('id');
  
  constructor(
    private route: Router,
    private authService: AuthService
  ) { }

  ngOnInit() { }
  
}
