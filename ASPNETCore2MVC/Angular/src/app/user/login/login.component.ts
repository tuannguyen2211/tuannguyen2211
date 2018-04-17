import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Credentials } from '../../shared/models/credentials';
import { UserService } from '../user.service';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  fullName: string;
  errors: string;
  isRequesting: boolean;
  submitted: boolean = false;
  private _userAuthStoreKey = "currentUser";
  credentials: Credentials = { username: '', password: '' };
  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) { }
  ngOnInit() {
  }
  login({ value, valid }: { value: Credentials, valid: boolean }) {
    this.submitted = true;
    this.isRequesting = true;
      this.errors = '';
    if (valid) {
      this.userService.login(value.username, value.password)
        //.finally(() => this.isRequesting = false)
        .subscribe(
        result => {
          if (result.access_token) {
            this.router.navigate(['/home'])
            //this.router.navigate(['/MyProfile', { fullName: this.fullName }])
          }
          else {
            this.errors = result.message;
          }
        },
        error => this.errors = error.error);
      }
    }
  }
