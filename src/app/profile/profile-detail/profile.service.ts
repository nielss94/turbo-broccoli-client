import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { User } from '../../shared/user.model';

@Injectable()
export class ProfileService {
    userChanged = new Subject<User>();
    private headers = new Headers({ 'Content-Type': 'application/json',
    'Authorization' : 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MTMyNDI5OTgsImlhdCI6MTUxMzA3MDE5OCwic3ViIjoiTmllbHNzIn0.sCU2-gadSrTGyAltU1O08aXRFf9u9GOKs9zfrDuSbdw'});
    private serverUrl = 'http://localhost:3000/api/v1' + '/users';

    private user: User;

    constructor(private http: Http) {}

    private httpGetUser(id: Number) {
      return this.http.get(this.serverUrl + '/' + id.toString(), {headers: this.headers})
      .toPromise()
      .then((response) => {
        return response.json() as User;
      })
      .catch((error) => {
        return this.handleError(error);
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
