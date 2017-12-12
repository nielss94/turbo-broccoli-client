import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { LoginService } from '../login/login.service';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedIn = false;
  subscription: Subscription;
  user: string;

  constructor(private location: Location, private loginService: LoginService) {
    if (localStorage.getItem('username')) {
      this.loggedIn = true;
    }
  }

  ngOnInit() {
    this.subscription = this.loginService.userLoggedIn
    .subscribe(
      (user) => {
        this.user = user;
        if (localStorage.getItem('username')) {
          this.loggedIn = true;
        }else {
          this.loggedIn = false;
        }
        console.log('header user is: ' + this.user);
      });
  }

  logout() {
    this.loginService.logout();
  }

  back() {
    this.location.back();
  }
}
