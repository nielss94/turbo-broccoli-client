import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { User } from '../../shared/user.model';

@Injectable()
export class ProfileService {
    userChanged = new Subject<User>();
    subscriptionsChanged = new Subject<string[]>();
    private headers = new Headers({ 'Content-Type': 'application/json',
    'Authorization' : 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MTMyNDI5OTgsImlhdCI6MTUxMzA3MDE5OCwic3ViIjoiTmllbHNzIn0.sCU2-gadSrTGyAltU1O08aXRFf9u9GOKs9zfrDuSbdw'});
    private usersUrl = 'https://turbo-broccoli-server.herokuapp.com/api/v1' + '/users';
    private subscriptionsUrl = 'https://turbo-broccoli-server.herokuapp.com/api/v1' + '/subscriptions';

    private user: User;
    private subscriptions: string[];

    constructor(private http: Http) {}

    private httpGetUser(id: Number) {
      return this.http.get(this.usersUrl + '/' + id.toString(), {headers: this.headers})
      .toPromise()
      .then((response) => {
        return response.json() as User;
      })
      .catch((error) => {
        return this.handleError(error);
      });
    }

    private httpGetSubscriptionsByUser(username: string) {
      return this.http.get(this.subscriptionsUrl + '/' + username, {headers: this.headers})
      .toPromise()
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        return this.handleError(error);
      });
    }

    private httpPostSubscribeToPage(userId: Number, page) {
      return this.http.post(this.subscriptionsUrl, {
        userId: userId.toString(),
        page: page
      }, {headers: this.headers})
      .toPromise()
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        return this.handleError(error);
      });
    }

    private httpRegisterUser(user) {
      return this.http.post(this.usersUrl, user, {headers: this.headers})
      .toPromise()
      .then((response) => {
        return response.json() as User;
      })
      .catch((error) => {
        return this.handleError(error);
      });
    }

    public getSubscriptionsByUser(username) {
      this.httpGetSubscriptionsByUser(username)
        .then((subscriptions) => {
          const subs: string[] = [];
          subscriptions.forEach(element => {
            subs.push(element.p.properties.name);
          });
          this.subscriptions = subs;
          this.subscriptionsChanged.next(this.subscriptions.slice());
        })
        .catch((rejected) => {
          console.log(rejected);
        });
    }

    public postSubscribeToPage(userId: Number, page) {
      this.httpPostSubscribeToPage(userId, page)
      .then((response) => {
        this.getSubscriptionsByUser(localStorage.getItem('username'));
        console.log('sub/unsub by' + localStorage.getItem('username') + ' ' + localStorage.getItem('userId'));
      })
      .catch((rejected) => {
        console.log(rejected);
      });
    }

    public registerUser(user){
      return this.httpRegisterUser(user)
      .then((user) => {
          return user;
      })
      .catch((rejected) => {
          console.log(rejected);
      });
    }

    public getUser(id: Number) {
      this.httpGetUser(id)
      .then((user) => {
          this.user = user;
          this.userChanged.next(this.user);
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
