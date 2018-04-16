import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let isLoggined = this.userService.isLoggined();
    if (isLoggined) {
      return true;
    }
    else {
      this.router.navigate(['/login']);
      //this.router.navigate(['/401'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
}
@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    debugger;
    if (route.data && route.data['listRoles']) {
      let roles = route.data['listRoles'];
      let temp = this.userService.getroles();
      let userRoles = temp.split(';');
      for (let role of roles) {
        if (userRoles.some(p => p.toLowerCase() === role.toLowerCase())) {
          return true;
        }
        if (route.data["returnUrl"] == null) {
          window.alert("You don't have permission to view this page");
          this.router.navigate(['/403'], { queryParams: { returnUrl: state.url } });
        }
        else this.router.navigate(route.data["returnUrl"]);
      }
    }
    return true;
  }
  }
