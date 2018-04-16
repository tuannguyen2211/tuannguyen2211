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
            //var helper = new JwtHelper();
            //let user: any = result;//response.json();
            //var payLoad = JSON.parse(atob(result.access_token.split('.')[1]));
            //user.id = payLoad["Id"];
            //user.joingDate = payLoad["date"];
            //user.fullName = payLoad["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"];
            //user.userName = value.username;
            //if (user && user.access_token) {
            //  // store user details and jwt token in local storage to keep user logged in between page refreshes
            //  localStorage.setItem(this._userAuthStoreKey, JSON.stringify(user));
            //}
            this.router.navigate(['/home'])
            //this.router.navigate(['/MyProfile', { fullName: this.fullName }])
          }
          else {
            this.errors = result.message;
          }
        },
        error => this.errors = error);
      }
    }
  }
