import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) {
    if (!localStorage.getItem('username')) {
      console.log('username not found, navigate to login pls');
      router.navigate(['/profile/login']);
    }else {
      console.log(localStorage.getItem('username'));
    }
  }

  ngOnInit() {
  }

}
