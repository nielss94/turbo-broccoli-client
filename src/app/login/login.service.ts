import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { User } from '../shared/user.model';
import { Subject } from 'rxjs/Subject';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class LoginService {
    userLoggedIn = new Subject<string>();
    private headers = new Headers({ 'Content-Type': 'application/json'});
    private serverUrl = 'http://localhost:3000/api/v1' + '/login';

    private currentUser: string;

    constructor(private http: Http, private router: Router, private route: ActivatedRoute) {}
    public httpLogin(user: string, password: string) {
        return this.http.post(this.serverUrl, {username: user, password: password}, {headers: this.headers}).toPromise()
        .then((response) => {
            localStorage.setItem('username', response.json().username);
            localStorage.setItem('token', response.json().token);
            this.currentUser = response.json().username;
            this.userLoggedIn.next(this.currentUser);
            return true;
          })
          .catch(() => {
            return false;
          });
    }

    public logout() {
        localStorage.clear();
        this.currentUser = null;
        this.userLoggedIn.next(this.currentUser);
    }

    private handleError(error: any): Promise<any> {
        console.log('handleError');
        return Promise.reject(error.message || error);
    }
}
