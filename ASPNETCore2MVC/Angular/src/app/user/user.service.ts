
import { Observable } from "rxjs/Rx"
import { Injectable } from "@angular/core";
import { Headers, Response, RequestOptions, RequestMethod } from "@angular/http";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import "rxjs/add/operator/map";
import { ConfigService } from '../shared/utils/config.service';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

export class Role {
  constructor(private roles: Array<string>) {

  }
  contains(role: string): boolean {
    return this.roles.some(p => p.toLowerCase() === role.toLowerCase());
  }
}

@Injectable()
export class UserService {
  private _userAuthStoreKey = "currentUser";
  baseUrl: string = '';
  constructor(private http: HttpClient, private _configService: ConfigService) {
    this.baseUrl = _configService.getApiUrl();
  }
  login(userName: string, password: string) {
    var headers = new HttpHeaders({ 'Content-type': 'application/json' });
    let body = JSON.stringify({ username: userName, password: password });
    return this.http.post(this.getAbsouluteUrl("/api/user/login"), body, { headers: headers })
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let user: any = response;//response.json();
        var helper = new JwtHelper();
        var payLoad = helper.decodeToken((response as any).access_token as string);
        user.id = payLoad["Id"];
        user.joingDate = payLoad["date"];
        user.fullName = payLoad["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"];
        user.userName = userName;
        user.roles = payLoad["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        if (user && user.access_token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem(this._userAuthStoreKey, JSON.stringify(user));
        }
        return response;
      }).catch((err: Response) => {
        console.log(err.statusText);
        return Observable.throw(err);
      });
  }

  getUserById(id: number) {
    return this.http.get(this.getAbsouluteUrl("/api/user/get" + id)).map((response: Response) => response.json);
  }

  getAbsouluteUrl(path: string): string {
    var directory = this.baseUrl + path;
    return directory;
  }

  logout() {
    localStorage.removeItem(this._userAuthStoreKey);
  }

  // private helper methods
  public jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem(this._userAuthStoreKey));
    if (currentUser && currentUser.token) {
      let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
      return new RequestOptions({ headers: headers });
    }
  }
  public getToken(): string {
    let authInfo = this.getAuthInfo();
    if (authInfo == null) {
      return null;
    }
    return authInfo.access_token;
  }
  public getAuthInfo() {
    let userAuthString = localStorage.getItem(this._userAuthStoreKey);
    if (userAuthString === null) {
      return null;
    }
    return JSON.parse(userAuthString);
  }
  public getAuthHttpOptions() {
    let headers = new HttpHeaders({ 'Content-type': 'application/json', 'Authorization': 'Bearer ' + this.getToken() });
    return { headers: headers };
  }
  public isLoggined() {
    let userAuthString = localStorage.getItem(this._userAuthStoreKey);
    if (userAuthString === null)
      return false;
    else
      return true;
  }
  public getroles() {
    let authInfo = this.getAuthInfo();
    if (authInfo == null)
      return null;
    else
      return authInfo.roles;
  }
}
