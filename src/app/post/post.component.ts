import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from './post.service';
import { Subscription } from 'rxjs/Subscription';
import { Post } from '../shared/post.model';
import { LoginService } from '../login/login.service';
import { Comment } from '../shared/comment.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  page: string;
  id: string;
  post: Post;
  comment: string;

  private subscription: Subscription;

  constructor(private router: Router, private route: ActivatedRoute, private postService: PostService, private loginService: LoginService) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params) => {
        this.page = params['page'];
        this.id = params['id'];
      }
    );

    this.subscription = this.postService.postChanged
    .subscribe(
      (post: Post) => {
        this.post = post;
      });

    this.postService.getPost(this.id);
  }

  postComment() {
    this.postService.postComment(this.post,this.comment);
  }


  deletePost() {
    this.postService.deletePost(this.id);
  }
}
