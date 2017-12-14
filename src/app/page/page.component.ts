import { Component, OnInit } from '@angular/core';
import { PageService } from './page.service';
import { Post } from '../shared/post.model';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { ProfileService } from '../profile/profile.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  posts: Post[];
  private postSubscription: Subscription;
  private subSubscription: Subscription;

  page: string;
  creatingPost = false;
  subscriptions: string[] = [];

  // new post attributes
  title: string;
  content: string;

  constructor (private profileService: ProfileService, private loginService: LoginService, private pageService: PageService,
              private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params) => {
        this.page = params['page'];
        console.log(this.page);
      }
    );

    this.postSubscription = this.pageService.postsChanged
      .subscribe(
        (posts: Post[]) => {
          this.posts = posts;
        });

    this.subSubscription = this.profileService.subscriptionsChanged
      .subscribe(
        (subscriptions: string[]) => {
          this.subscriptions = subscriptions;
          console.log(this.subscriptions);
        });

    this.pageService.getPostsFromPage(this.page);
    if (localStorage.getItem('username')){
      this.profileService.getSubscriptionsByUser(localStorage.getItem('username'));
    }
  }

  createPost() {
    const post = {
      title: this.title,
      content: this.content,
      user: localStorage.getItem('username'),
      page: this.page
    };
    this.pageService.postPostToPage(post);
    this.creatingPost = false;
  }

  isSubscribed(): boolean {
    const value = false;
    for (let i = 0; i < this.subscriptions.length ; i++) {
      if (this.subscriptions[i] === this.page) {
        return true;
      }
    }
    return false;
  }

  subscribe() {
    this.profileService.postSubscribeToPage(Number(localStorage.getItem('userId')), this.page);
  }
}
