import { Component, OnInit } from '@angular/core';
import { PageService } from './page.service';
import { Post } from '../shared/post.model';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  posts: Post[];
  private subscription: Subscription;
  page: string;

  constructor(private pageService: PageService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params) => {
        this.page = params['page'];
        console.log(this.page);
      }
    );

    this.subscription = this.pageService.postsChanged
      .subscribe(
        (posts: Post[]) => {
          this.posts = posts;
        });

    this.pageService.getPostsFromPage(this.page);
  }
}
