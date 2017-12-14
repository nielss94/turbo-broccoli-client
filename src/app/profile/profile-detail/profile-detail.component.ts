import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../../shared/user.model';
import { ProfileService } from '../profile.service';
import { LoginService } from '../../login/login.service';
@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {

  private user: User = new User(0,'','');
  username: string;
  email: string;
  private userSubscription: Subscription;
  private subSubscription: Subscription;

  
  subscriptions: string[] = [];

  constructor(private loginService: LoginService, private profileService: ProfileService, private router: Router, route: ActivatedRoute) {
    if (!localStorage.getItem('username')) {
      router.navigate(['/profile/login']);
    }
  }

  ngOnInit() {
    
    this.userSubscription = this.profileService.userChanged
    .subscribe(
      (user: User) => {
        this.user = user;
      });

      this.subSubscription = this.profileService.subscriptionsChanged
      .subscribe(
        (subscriptions: string[]) => {
          this.subscriptions = subscriptions;
          console.log(this.subscriptions);
        });
    this.profileService.getUser(Number(localStorage.getItem('userId')));
    this.profileService.getSubscriptionsByUser(localStorage.getItem('username'));
  }

  deleteProfile() {
    this.profileService.deleteUser(this.user);
    this.loginService.logout();
    this.router.navigate(['/dashboard']);
  }
}
