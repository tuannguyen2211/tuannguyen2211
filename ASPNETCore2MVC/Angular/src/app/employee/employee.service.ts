import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, RequestOptions, RequestMethod } from '@angular/http';
import "rxjs/add/operator/map";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';  
import { ConfigService } from '../shared/utils/config.service';
import { UserService } from '../user/user.service'

@Injectable()
export class EmployeeService {
  baseUrl: string;
  constructor(private http: HttpClient, private _configService: ConfigService, private userService: UserService) {
    this.baseUrl = _configService.getApiUrl();
  }

  getEmployees() {
    var s = this.userService.getAuthHttpOptions();
    return this.http.get(this.getAbsouluteUrl('/api/employee/index'), this.userService.getAuthHttpOptions()).map((response: Response) => { return response }).catch(this.errorHandler);
  }
  getEmployeeById(id: number) {
    return this.http.get(this.getAbsouluteUrl('/api/employee/detail/' + id), this.userService.getAuthHttpOptions()).map((response: Response) => { return response }).catch(this.errorHandler);
  }
  addEmployee(employee) {
    return this.http.post(this.getAbsouluteUrl('/api/employee/add'), employee, this.userService.getAuthHttpOptions()).map((response: Response) => { return response }).catch(this.errorHandler);
  }
  updateEmployee(employee) {
    return this.http.post(this.getAbsouluteUrl('/api/employee/edit'), employee, this.userService.getAuthHttpOptions()).map((response: Response) => { return response }).catch(this.errorHandler);
  }
  deleteEmployee(id: number) {
    return this.http.delete(this.getAbsouluteUrl('/api/employee/delete/' + id), this.userService.getAuthHttpOptions()).map((response: Response) => { return response }).catch(this.errorHandler);
  }
  getAbsouluteUrl(path: string): string {
    var directory = this.baseUrl + path;
    return directory;
  }

  errorHandler(error: Response) {
    console.log(error);
    return Observable.throw(error);
  }
}
