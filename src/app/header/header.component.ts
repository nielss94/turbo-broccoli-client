import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { LoginService } from '../login/login.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { ProfileService } from '../profile/profile.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedIn = false;
  subscription: Subscription;
  user: string;
  searchValue: string = '';
  private subSubscription: Subscription;

  subscriptions: string[] = [];

  constructor(private location: Location, private loginService: LoginService, private router: Router, private profileService: ProfileService) {
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

    this.subSubscription = this.profileService.subscriptionsChanged
    .subscribe(
      (subscriptions: string[]) => {
        this.subscriptions = subscriptions;
        console.log(this.subscriptions);
      });

    if(this.loggedIn){
      this.profileService.getSubscriptionsByUser(localStorage.getItem('username'));
    }
  }
  
  logout() {
    this.loginService.logout();
    this.router.navigate(['/profile/login']);
  }

  back() {
    this.location.back();
  }
}
