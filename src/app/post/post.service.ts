import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Post } from '../shared/post.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PostService {
    postChanged = new Subject<Post>();
    private headers = new Headers({ 'Content-Type': 'application/json',
    'Authorization' : 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MTMyNDI5OTgsImlhdCI6MTUxMzA3MDE5OCwic3ViIjoiTmllbHNzIn0.sCU2-gadSrTGyAltU1O08aXRFf9u9GOKs9zfrDuSbdw'});
    private serverUrl = 'http://localhost:3000/api/v1' + '/posts';

    private post: Post;

    constructor(private http: Http) {}

    private httpGetPost(id: Number) {
      return this.http.get(this.serverUrl + '/' + id.toString(), {headers: this.headers})
      .toPromise()
      .then((response) => {
        return response.json()[0] as Post;
      })
      .catch((error) => {
        return this.handleError(error);
      });
    }
    
    private httpPostComment(postId, comment) {
      return this.http.post(this.serverUrl + '/'+ postId.toString() + '/comments', {
        content: comment,
        postId : postId,
        user: localStorage.getItem('username')
      },{headers: this.headers})
      .toPromise()
      .then((response) => {
        return response.json() as Post;
      })
      .catch((error) => {
        return this.handleError(error);
      });
    }

  public getPost(id: Number) {
    this.httpGetPost(id)
    .then((post) => {
        this.post = post;
        this.postChanged.next(this.post);
    })
    .catch((rejected) => {
        console.log(rejected);
    });
  }

  public postComment(post, comment){
    this.httpPostComment(post._id,comment)
    .then((post) => {
      this.post = post;
      this.postChanged.next(this.post);
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
