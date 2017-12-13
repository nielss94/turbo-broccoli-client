import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../login/login.service';
import { ProfileService } from '../profile/profile-detail/profile.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  
  username: string = '';
  password: string = '';
  email: string = '';

  constructor(private profileService: ProfileService, private loginService: LoginService, private router: Router, private route: ActivatedRoute) {
    if (this.loginService.loggedIn()) {
      router.navigate(['/profile']);
    }
   }

  ngOnInit() {
  }

  registerUser() {
    if(this.username != '' && this.password != '' && this.email != '') {
      const user = {
        username: this.username,
        password: this.password,
        email: this.email
      }
      this.profileService.registerUser(user)
        .then(() => {
          console.log('user created');
          this.router.navigate(['/profile']);  
        })
        .catch((reject) => {
          console.log('failed to create user');
        })
    }
  }
}
