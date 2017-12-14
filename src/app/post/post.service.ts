import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Post } from '../shared/post.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PostService {
    postChanged = new Subject<Post>();
    private headers = new Headers({ 'Content-Type': 'application/json'});
    private serverUrl = 'https://turbo-broccoli-server.herokuapp.com/api/v1' + '/posts';

    private post: Post;

    constructor(private http: Http) {}

    private httpGetPost(id: string) {
      return this.http.get(this.serverUrl + '/' + id, {headers: this.headers})
      .toPromise()
      .then((response) => {
        return response.json()[0] as Post;
      })
      .catch((error) => {
        return this.handleError(error);
      });
    }
    private httpDeletePost(id: string) {
      return this.http.delete(this.serverUrl + '/' + id, {headers: new Headers({ 'Content-Type': 'application/json',
      'Authorization' : localStorage.getItem('token')})
      })
      .toPromise()
      .then((response) => {
        return response.json() as Post;
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

  public getPost(id: string) {
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

  public deletePost(id: string) {
    this.httpDeletePost(id)
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
