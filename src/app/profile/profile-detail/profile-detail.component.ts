import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {

  constructor(private router: Router, route: ActivatedRoute) {
    if (!localStorage.getItem('username')) {
      router.navigate(['/profile/login']);
    }
  }

  ngOnInit() {
  }

}
