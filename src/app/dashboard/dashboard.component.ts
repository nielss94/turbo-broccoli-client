import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Post } from '../shared/post.model';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  posts: Post[];
  private subscription: Subscription;

  constructor(private dashboardService: DashboardService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.subscription = this.dashboardService.postsChanged
      .subscribe(
        (posts: Post[]) => {
          this.posts = posts;
        });

    this.dashboardService.getAllPosts();
  }
}
