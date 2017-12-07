import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Post } from '../shared/post.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PageService {
    postsChanged = new Subject<Post[]>();
    private headers = new Headers({ 'Content-Type': 'application/json',
    'Authorization' : 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE' +
    '1MTI3Mzk5MDgsImlhdCI6MTUxMjU2NzEwOCwic3ViIjoiRmVsaXgifQ.zCwEyOBMqCzAyxSa0NjCTqP1r2shyBquHsv_Xjubv-8'});
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

  private handleError(error: any): Promise<any> {
    console.log('handleError');
    return Promise.reject(error.message || error);
  }
}
