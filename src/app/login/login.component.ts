import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidCredentials: boolean;
  username: string;
  password: string;

  constructor(private loginService: LoginService, private router: Router, private route: ActivatedRoute) { 
    console.log(localStorage.getItem('username'));
    if (localStorage.getItem('username')) {
      router.navigate(['/profile']);
    }
  }

  ngOnInit() {
  }

  login() {
    this.loginService.httpLogin(this.username, this.password)
      .then((result) => {
        if (result) {
          this.router.navigate(['../']);
        }else {
          console.log('failed to log in'  );
        }
      });
  }
}
