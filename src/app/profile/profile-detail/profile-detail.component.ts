import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../../shared/user.model';
import { ProfileService } from './profile.service';
@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {

  user: User;
  username: string;
  email: string;
  private subscription: Subscription;

  constructor(private profileService: ProfileService, private router: Router, route: ActivatedRoute) {
    if (!localStorage.getItem('username')) {
      router.navigate(['/profile/login']);
    }

    this.subscription = this.profileService.userChanged
    .subscribe(
      (user: User) => {
        this.user = user;
      });

    this.profileService.getUser(Number(localStorage.getItem('userId')));
  }

  ngOnInit() {
  }

}
