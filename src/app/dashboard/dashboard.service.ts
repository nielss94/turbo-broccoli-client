import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Post } from '../shared/post.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DashboardService {
    postsChanged = new Subject<Post[]>();
    private headers = new Headers({ 'Content-Type': 'application/json',
    'Authorization' : 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE' +
    '1MTI3Mzk5MDgsImlhdCI6MTUxMjU2NzEwOCwic3ViIjoiRmVsaXgifQ.zCwEyOBMqCzAyxSa0NjCTqP1r2shyBquHsv_Xjubv-8'});
    private serverUrl = 'https://turbo-broccoli-server.herokuapp.com/api/v1' + '/posts';

    private posts: Post[] = [];

    constructor(private http: Http) {}

    private httpGetAllPosts() {
        return this.http.get(this.serverUrl, {headers: this.headers})
        .toPromise()
        .then((response) => {
            return response.json() as Post[];
        })
        .catch((error) => {
            return this.handleError(error);
        });
    }

    public getAllPosts() {
        this.httpGetAllPosts()
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
