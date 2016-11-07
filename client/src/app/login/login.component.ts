import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

import { UserService } from '../services/user.service';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})

export class LoginComponent {
  constructor(private userService: UserService) {}

  onSubmit(event, email, password) { 
    this.userService.login(event, email, password);
  }
}
