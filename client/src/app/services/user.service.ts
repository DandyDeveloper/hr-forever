import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { contentHeaders } from '../services/headers';

const domain = 'http://localhost:8888';

@Injectable()
export class UserService {
  private loggedIn = false;

  constructor(public router: Router, private http: Http) {
    this.loggedIn = !!localStorage.getItem('id_token');
  }

  login(event, email, password) {
  event.preventDefault();
  let body = JSON.stringify({ email, password });
  this.http.post('http://localhost:8888/api/auth/login', body, { headers: contentHeaders })
            .subscribe(
              response => {
                console.log(response.json().id_token); 
                localStorage.setItem('id_token', response.json().id_token);
                this.router.navigate(['home']);
              },
              error => {
                alert(error.text());
                console.log(error.text());
              }
            );
  }

  signup(event) {
    event.preventDefault();
    this.router.navigate(['signup']);
  }
  
  logout() {
    localStorage.removeItem('id_token');
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}