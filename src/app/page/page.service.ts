import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Post } from '../shared/post.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PageService {
    postsChanged = new Subject<Post[]>();
    private headers = new Headers({ 'Content-Type': 'application/json',
    'Authorization' : 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MTMyNDI5OTgsImlhdCI6MTUxMzA3MDE5OCwic3ViIjoiTmllbHNzIn0.sCU2-gadSrTGyAltU1O08aXRFf9u9GOKs9zfrDuSbdw'});
    private serverUrl = 'http://localhost:3000/api/v1' + '/posts';

    private posts: Post[] = [];

    constructor(private http: Http) {}

  private httpGetPostsFromPage(page: string) {
    return this.http.get(this.serverUrl + '/page/' + page, {headers: this.headers})
    .toPromise()
    .then((response) => {
      return response.json() as Post[];
    })
    .catch((error) => {
      return this.handleError(error);
    });
  }

  private httpPostPostToPage(post) {
    return this.http.post(this.serverUrl, post, {headers: this.headers})
    .toPromise()
    .then((response) => {
      return response.json() as Post;
    })
    .catch((error) => {
      return this.handleError(error);
    });
  }

  public getPostsFromPage(page: string) {
    this.httpGetPostsFromPage(page)
    .then((posts) => {
        this.posts = posts;
        this.postsChanged.next(this.posts.slice());
    })
    .catch((rejected) => {
        console.log(rejected);
    });
  }

  public postPostToPage(post) {
    this.httpPostPostToPage(post)
    .then((post) => {
        this.posts.push(post);
        this.postsChanged.next(this.posts.slice());
    })
    .catch((rejected) => {
        console.log(rejected);
    });
  }

  private handleError(error: any): Promise<any> {
    console.log('handleError');
    return Promise.reject(error.message || error);
  }
}
