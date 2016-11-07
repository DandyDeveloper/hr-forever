import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';

@Component({
  selector: 'login',
  template: `...`
})

export class LoginComponent {
  constructor(private userService: UserService, private router: Router) {}

  onSubmit(username, password) {
    this.userService.login(username, password).subscribe((result) => {
      if (result) {
        this.router.navigate(['']);
      }
    });

  }
}