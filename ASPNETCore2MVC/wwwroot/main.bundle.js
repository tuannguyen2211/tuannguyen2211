webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/_guards/auth.guard.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var user_service_1 = __webpack_require__("./src/app/user/user.service.ts");
var AuthGuard = /** @class */ (function () {
    function AuthGuard(userService, router) {
        this.userService = userService;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (next, state) {
        var isLoggined = this.userService.isLoggined();
        if (isLoggined) {
            return true;
        }
        else {
            this.router.navigate(['/login']);
            //this.router.navigate(['/401'], { queryParams: { returnUrl: state.url } });
            return false;
        }
    };
    AuthGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [user_service_1.UserService, router_1.Router])
    ], AuthGuard);
    return AuthGuard;
}());
exports.AuthGuard = AuthGuard;
var AuthorizationGuard = /** @class */ (function () {
    function AuthorizationGuard(userService, router) {
        this.userService = userService;
        this.router = router;
    }
    AuthorizationGuard.prototype.canActivate = function (route, state) {
        debugger;
        if (route.data && route.data['listRoles']) {
            var roles = route.data['listRoles'];
            var temp = this.userService.getroles();
            var userRoles = temp.split(';');
            var _loop_1 = function (role) {
                if (userRoles.some(function (p) { return p.toLowerCase() === role.toLowerCase(); })) {
                    return { value: true };
                }
                if (route.data["returnUrl"] == null) {
                    window.alert("You don't have permission to view this page");
                    this_1.router.navigate(['/403'], { queryParams: { returnUrl: state.url } });
                }
                else
                    this_1.router.navigate(route.data["returnUrl"]);
            };
            var this_1 = this;
            for (var _i = 0, roles_1 = roles; _i < roles_1.length; _i++) {
                var role = roles_1[_i];
                var state_1 = _loop_1(role);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
        }
        return true;
    };
    AuthorizationGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [user_service_1.UserService, router_1.Router])
    ], AuthorizationGuard);
    return AuthorizationGuard;
}());
exports.AuthorizationGuard = AuthorizationGuard;


/***/ }),

/***/ "./src/app/app-routing.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var profile_component_1 = __webpack_require__("./src/app/user/profile/profile.component.ts");
var profile_detail_component_1 = __webpack_require__("./src/app/user/profile/profile-detail/profile-detail.component.ts");
var login_component_1 = __webpack_require__("./src/app/user/login/login.component.ts");
var main_component_1 = __webpack_require__("./src/app/main/main.component.ts");
var employee_list_component_1 = __webpack_require__("./src/app/employee/employee-list/employee-list.component.ts");
var employee_cr_component_1 = __webpack_require__("./src/app/employee/employee-cr/employee-cr.component.ts");
var e_401_component_1 = __webpack_require__("./src/app/error/e-401/e-401.component.ts");
var e_403_component_1 = __webpack_require__("./src/app/error/e-403/e-403.component.ts");
var auth_guard_1 = __webpack_require__("./src/app/_guards/auth.guard.ts");
var routes = [
    {
        path: 'login',
        component: login_component_1.LoginComponent
    },
    {
        path: '',
        component: main_component_1.MainComponent,
        "canActivate": [auth_guard_1.AuthGuard],
        //pathMatch: 'full'
        children: [
            {
                path: 'home',
                component: profile_component_1.ProfileComponent
            },
            {
                path: 'myprofile',
                component: profile_detail_component_1.ProfileDetailComponent,
                "canActivate": [auth_guard_1.AuthorizationGuard],
                "data": {
                    'listRoles': ["BA"]
                }
            },
            {
                path: 'employee',
                component: employee_list_component_1.EmployeeListComponent,
                "canActivate": [auth_guard_1.AuthorizationGuard],
                "data": {
                    'listRoles': ["BA"]
                }
            },
            {
                path: 'employee/add',
                component: employee_cr_component_1.EmployeeCrComponent,
                "canActivate": [auth_guard_1.AuthorizationGuard],
                "data": {
                    'listRoles': ["BA"]
                }
            },
            {
                path: 'employee/edit/:id',
                component: employee_cr_component_1.EmployeeCrComponent,
                "canActivate": [auth_guard_1.AuthorizationGuard],
                "data": {
                    'listRoles': ["BA"]
                }
            },
            {
                path: '401',
                component: e_401_component_1.E401Component
            },
            {
                path: '403',
                component: e_403_component_1.E403Component
            },
            {
                path: '**',
                redirectTo: 'home'
            }
        ]
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;


/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--<app-navbar></app-navbar>\r\n<app-sidebar></app-sidebar>\r\n<app-content></app-content>-->\r\n<router-outlet></router-outlet>\r\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'app';
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;


/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var app_component_1 = __webpack_require__("./src/app/app.component.ts");
var profile_component_1 = __webpack_require__("./src/app/user/profile/profile.component.ts");
var login_component_1 = __webpack_require__("./src/app/user/login/login.component.ts");
var app_routing_module_1 = __webpack_require__("./src/app/app-routing.module.ts");
var login_module_1 = __webpack_require__("./src/app/user/login/login.module.ts");
var profile_module_1 = __webpack_require__("./src/app/user/profile/profile.module.ts");
var profile_detail_module_1 = __webpack_require__("./src/app/user/profile/profile-detail/profile-detail.module.ts");
var employee_list_module_1 = __webpack_require__("./src/app/employee/employee-list/employee-list.module.ts");
var employee_cr_module_1 = __webpack_require__("./src/app/employee/employee-cr/employee-cr.module.ts");
var http_1 = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
var config_service_1 = __webpack_require__("./src/app/shared/utils/config.service.ts");
var auth_guard_1 = __webpack_require__("./src/app/_guards/auth.guard.ts");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
var profile_detail_component_1 = __webpack_require__("./src/app/user/profile/profile-detail/profile-detail.component.ts");
var employee_list_component_1 = __webpack_require__("./src/app/employee/employee-list/employee-list.component.ts");
var employee_cr_component_1 = __webpack_require__("./src/app/employee/employee-cr/employee-cr.component.ts");
var navbar_component_1 = __webpack_require__("./src/app/navbar/navbar.component.ts");
var sidebar_component_1 = __webpack_require__("./src/app/sidebar/sidebar.component.ts");
var content_component_1 = __webpack_require__("./src/app/content/content.component.ts");
var kendo_angular_grid_1 = __webpack_require__("./node_modules/@progress/kendo-angular-grid/dist/es/index.js");
var employee_binding_directive_directive_1 = __webpack_require__("./src/app/employee/employee-list/employee-binding-directive.directive.ts");
// Import the Animations module
var animations_1 = __webpack_require__("./node_modules/@angular/platform-browser/esm5/animations.js");
var main_component_1 = __webpack_require__("./src/app/main/main.component.ts");
var e_401_component_1 = __webpack_require__("./src/app/error/e-401/e-401.component.ts");
var e_403_component_1 = __webpack_require__("./src/app/error/e-403/e-403.component.ts");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                profile_component_1.ProfileComponent,
                login_component_1.LoginComponent,
                profile_detail_component_1.ProfileDetailComponent,
                employee_list_component_1.EmployeeListComponent,
                employee_cr_component_1.EmployeeCrComponent,
                navbar_component_1.NavbarComponent,
                sidebar_component_1.SidebarComponent,
                content_component_1.ContentComponent,
                employee_binding_directive_directive_1.EmployeeBindingDirectiveDirective,
                main_component_1.MainComponent,
                e_401_component_1.E401Component,
                e_403_component_1.E403Component
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                login_module_1.LoginModule,
                profile_module_1.ProfileModule,
                profile_detail_module_1.ProfileDetailModule,
                employee_list_module_1.EmployeeListModule,
                employee_cr_module_1.EmployeeCrModule,
                app_routing_module_1.AppRoutingModule,
                http_1.HttpClientModule,
                kendo_angular_grid_1.GridModule,
                animations_1.BrowserAnimationsModule
            ],
            providers: [config_service_1.ConfigService, auth_guard_1.AuthGuard, auth_guard_1.AuthorizationGuard],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;


/***/ }),

/***/ "./src/app/content/content.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/content/content.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- content.component.html -->\r\n\r\n<section class=\"content\">\r\n  <div class=\"container-fluid\">\r\n    <div class=\"jumbotron\">\r\n      <router-outlet></router-outlet>\r\n    </div>\r\n  </div>\r\n</section>\r\n"

/***/ }),

/***/ "./src/app/content/content.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var ContentComponent = /** @class */ (function () {
    function ContentComponent() {
    }
    ContentComponent.prototype.ngOnInit = function () {
    };
    ContentComponent = __decorate([
        core_1.Component({
            selector: 'app-content',
            template: __webpack_require__("./src/app/content/content.component.html"),
            styles: [__webpack_require__("./src/app/content/content.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], ContentComponent);
    return ContentComponent;
}());
exports.ContentComponent = ContentComponent;


/***/ }),

/***/ "./src/app/employee/employee-cr/employee-cr.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/employee/employee-cr/employee-cr.component.html":
/***/ (function(module, exports) {

module.exports = "\r\n<!DOCTYPE html>\r\n<html>\r\n<head>\r\n  <meta charset=\"utf-8\" />\r\n  <title></title>\r\n</head>\r\n<body>\r\n  <h2>{{title}}</h2>\r\n  <h3>Employee</h3>\r\n  <hr />\r\n  <form [formGroup]=\"employeeForm\" (ngSubmit)=\"save()\" #formDir=\"ngForm\" novalidate>\r\n    <div class=\"form-group row\">\r\n      <label class=\" control-label col-md-12\" for=\"Name\">Name</label>\r\n      <div class=\"col-md-4\">\r\n        <input class=\"form-control\" type=\"text\" formControlName=\"name\" required>\r\n      </div>\r\n      <div *ngFor=\"let validation of employee_validation_messages.name\">\r\n        <span class=\"text-danger\" *ngIf=\"employeeForm.get('name').hasError(validation.type)  && formDir.submitted\">\r\n          {{validation.message}}\r\n        </span>\r\n      </div>\r\n    </div>\r\n    <div class=\"form-group row\">\r\n      <label class=\" control-label col-md-12\" for=\"Email\">Email</label>\r\n      <div class=\"col-md-4\">\r\n        <input class=\"form-control\" type=\"text\" formControlName=\"email\">\r\n      </div>\r\n      <div *ngFor=\"let validation of employee_validation_messages.email\">\r\n        <span class=\"text-danger\" *ngIf=\"employeeForm.get('email').hasError(validation.type)  && formDir.submitted\">\r\n          {{validation.message}}\r\n        </span>\r\n      </div>\r\n    </div>\r\n    <div class=\"form-group row\">\r\n      <label class=\" control-label col-md-12\" for=\"Phone\">Phone</label>\r\n      <div class=\"col-md-4\">\r\n        <input class=\"form-control\" type=\"text\" formControlName=\"phone\">\r\n      </div>\r\n      <div *ngFor=\"let validation of employee_validation_messages.phone\">\r\n        <span class=\"text-danger\" *ngIf=\"employeeForm.get('phone').hasError(validation.type) && formDir.submitted\">\r\n          {{validation.message}}\r\n        </span>\r\n      </div>\r\n    </div>\r\n    <!--<div formGroupName=\"matching_passwords\" *ngIf=\"id==0\">\r\n      <div class=\"form-group row\">\r\n        <label class=\" control-label col-md-12\" for=\"password\">Password</label>\r\n        <div class=\"col-md-4\">\r\n          <input class=\"form-control\" type=\"password\" formControlName=\"password\">\r\n        </div>\r\n        <div *ngFor=\"let validation of employee_validation_messages.password\">\r\n          <span class=\"text-danger\" *ngIf=\"employeeForm.get('matching_passwords').get('password').hasError(validation.type) && (employeeForm.get('matching_passwords').get('password').dirty || employeeForm.get('matching_passwords').get('password').touched)\">\r\n            {{validation.message}}\r\n          </span>\r\n        </div>\r\n      </div>\r\n      <div class=\"form-group row\">\r\n        <label class=\" control-label col-md-12\" for=\"confirmPassword\">Confirm Password</label>\r\n        <div class=\"col-md-4\">\r\n          <input class=\"form-control\" type=\"password\" formControlName=\"confirmPassword\">\r\n        </div>\r\n        <div *ngFor=\"let validation of employee_validation_messages.confirm_password\">\r\n          <span class=\"text-danger\" *ngIf=\"(employeeForm.get('matching_passwords').get('confirmPassword').hasError(validation.type)|| employeeForm.get('matching_passwords').hasError(validation.type)) && (employeeForm.get('matching_passwords').get('confirmPassword').dirty || employeeForm.get('matching_passwords').get('confirmPassword').touched)\">\r\n            {{validation.message}}\r\n          </span>\r\n        </div>\r\n      </div>\r\n    </div>-->\r\n    <div class=\"form-group row\" *ngIf=\"id==0\">\r\n      <label class=\"control-label col-md-12\" for=\"Gender\">Password</label>\r\n      <div class=\"col-md-4\">\r\n        <input type=\"password\"\r\n               id=\"password\"\r\n               class=\"form-control\"\r\n               formControlName=\"password\">\r\n      </div>\r\n      <div *ngFor=\"let validation of employee_validation_messages.password\">\r\n        <span class=\"text-danger\" *ngIf=\"employeeForm.get('password').hasError(validation.type)  && formDir.submitted\">\r\n          {{validation.message}}\r\n        </span>\r\n      </div>\r\n    </div>\r\n    <div class=\"form-group row\" *ngIf=\"id==0\">\r\n      <label class=\"control-label col-md-12\" for=\"Gender\">Confirm Password</label>\r\n      <div class=\"col-md-4\">\r\n        <input type=\"password\"\r\n               class=\"form-control\"\r\n               id=\"confirmPassword\"\r\n               formControlName=\"confirmPassword\">\r\n      </div>\r\n      <div *ngFor=\"let validation of employee_validation_messages.confirm_password\">\r\n        <span class=\"text-danger\" *ngIf=\"employeeForm.get('confirmPassword').hasError(validation.type)  && formDir.submitted\">\r\n          {{validation.message}}\r\n        </span>\r\n      </div>\r\n    </div>\r\n      <div class=\"form-group row\">\r\n        <label class=\"control-label col-md-12\" for=\"Gender\">Gender</label>\r\n        <div class=\"col-md-4\">\r\n          <select class=\"form-control\" data-val=\"true\" formControlName=\"gender\">\r\n            <option value=\"\">-- Select Gender --</option>\r\n            <option value=\"Male\">Male</option>\r\n            <option value=\"Female\">Female</option>\r\n          </select>\r\n        </div>\r\n        <div *ngFor=\"let validation of employee_validation_messages.gender\">\r\n          <span class=\"text-danger\" *ngIf=\"employeeForm.get('gender').hasError(validation.type)  && formDir.submitted\">\r\n            {{validation.message}}\r\n          </span>\r\n        </div>\r\n      </div>\r\n      <div class=\"form-group row\">\r\n        <label class=\"control-label col-md-12\" for=\"Department\">Department</label>\r\n        <div class=\"col-md-4\">\r\n          <input class=\"form-control\" type=\"text\" formControlName=\"department\">\r\n        </div>\r\n        <div *ngFor=\"let validation of employee_validation_messages.department\">\r\n          <span class=\"text-danger\" *ngIf=\"employeeForm.get('department').hasError(validation.type)  && formDir.submitted\">\r\n            {{validation.message}}\r\n          </span>\r\n        </div>\r\n      </div>\r\n      <div class=\"form-group row\">\r\n        <label class=\"control-label col-md-12\" for=\"City\">City</label>\r\n        <div class=\"col-md-4\">\r\n          <input class=\"form-control\" type=\"text\" formControlName=\"city\" data-val=\"true\">\r\n        </div>\r\n        <div *ngFor=\"let validation of employee_validation_messages.city\">\r\n          <span class=\"text-danger\" *ngIf=\"employeeForm.get('city').hasError(validation.type)  && formDir.submitted\">\r\n            {{validation.message}}\r\n          </span>\r\n        </div>\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <button type=\"submit\" class=\"btn btn-success\">Save</button>\r\n        <button class=\"btn btn-warning\" (click)=\"cancel()\">Cancel</button>\r\n      </div>\r\n</form>\r\n</body>\r\n</html>\r\n"

/***/ }),

/***/ "./src/app/employee/employee-cr/employee-cr.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
var employee_service_1 = __webpack_require__("./src/app/employee/employee.service.ts");
var PasswordValidator_1 = __webpack_require__("./src/app/shared/validation/PasswordValidator.ts");
var EmployeeCrComponent = /** @class */ (function () {
    function EmployeeCrComponent(employeeService, _avRoute, _form, router) {
        this.employeeService = employeeService;
        this._avRoute = _avRoute;
        this._form = _form;
        this.router = router;
        this.id = 0;
        this.title = 'Create';
        this.employee_validation_messages = {
            'name': [
                { type: 'required', message: 'Name is required' },
                { type: 'minlength', message: 'Name must be at least 5 characters long' },
                { type: 'maxlength', message: 'Name cannot be more than 25 characters long' },
                { type: 'pattern', message: 'Your username must contain only numbers and letters' },
                { type: 'validUsername', message: 'Your username has already been taken' }
            ],
            'email': [
                { type: 'required', message: 'Email is required' },
                { type: 'pattern', message: 'Email is invalid' }
            ],
            'phone': [
                { type: 'required', message: 'Phone is required' },
                { type: 'pattern', message: 'Phone is invalid' }
            ],
            'gender': [
                { type: 'required', message: 'Gender is required' }
            ],
            'city': [
                { type: 'required', message: 'City is required' }
            ],
            'department': [
                { type: 'required', message: 'Department is required' }
            ],
            'confirm_password': [
                { type: 'required', message: 'Confirm password is required' },
                { type: 'MatchPassword', message: 'Confirm password mismatch with Password field' }
            ],
            'password': [
                { type: 'required', message: 'Password is required' },
                { type: 'minlength', message: 'Password must be at least 5 characters long' },
                { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
            ],
            'terms': [
                { type: 'pattern', message: 'You must accept terms and conditions' }
            ]
        };
        if (this._avRoute.snapshot.params["id"]) {
            this.id = this._avRoute.snapshot.params["id"];
        }
        this.employeeForm = this._form.group({
            id: 0,
            name: new forms_1.FormControl('', forms_1.Validators.compose([
                forms_1.Validators.required,
                forms_1.Validators.minLength(2),
                forms_1.Validators.maxLength(100),
                forms_1.Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
            ])),
            email: new forms_1.FormControl('', forms_1.Validators.compose([
                forms_1.Validators.required,
                forms_1.Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])),
            phone: new forms_1.FormControl('', forms_1.Validators.compose([
                forms_1.Validators.required,
                forms_1.Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")
            ])),
            password: new forms_1.FormControl('', forms_1.Validators.compose([
                forms_1.Validators.minLength(6),
                forms_1.Validators.required,
                forms_1.Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') //this is for the letters (both uppercase and lowercase) and numbers validation
            ])),
            confirmPassword: new forms_1.FormControl('', forms_1.Validators.required),
            //matching_passwords: new FormGroup({
            //  password: new FormControl('', Validators.compose([
            //    Validators.minLength(6),
            //    Validators.required,
            //    Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') //this is for the letters (both uppercase and lowercase) and numbers validation
            //  ])),
            //  confirmPassword: new FormControl('', Validators.required)
            //},
            // (formGroup: FormGroup) => {
            //  return PasswordValidator.areEqual(formGroup);
            //}
            //),
            gender: new forms_1.FormControl('', forms_1.Validators.required),
            department: new forms_1.FormControl('', forms_1.Validators.required),
            city: new forms_1.FormControl('', forms_1.Validators.required)
        }, {
            validator: PasswordValidator_1.PasswordValidator.MatchPassword
        });
    }
    EmployeeCrComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.id > 0) {
            this.title = "Edit";
            this.employeeService.getEmployeeById(this.id).subscribe(function (result) {
                _this.employeeForm.setValue({
                    id: result.id,
                    email: result.email,
                    name: result.name,
                    phone: result.phone,
                    gender: result.gender,
                    city: result.city,
                    department: result.department,
                    password: result.password,
                    confirmPassword: result.password
                    //matching_passwords: {
                    //  password: result.password,
                    //  confirmPassword: result.confirmPassword
                    //}
                });
                //this.employeeForm.setValue(result);
            }, function (error) { return _this.errorMessage = error; });
        }
        // else {
        //this.employeeForm = 
        // }
    };
    EmployeeCrComponent.prototype.save = function () {
        var _this = this;
        if (this.employeeForm.valid) {
            if (this.id > 0) {
                this.employeeService.updateEmployee(this.employeeForm.value).subscribe(function (data) {
                    _this.router.navigate(['/employee']);
                }, function (error) { return _this.errorMessage = error; });
            }
            else {
                this.employeeService.addEmployee(this.employeeForm.value).subscribe(function (data) {
                    _this.router.navigate(['/employee']);
                }, function (error) { return _this.errorMessage = error; });
            }
        }
    };
    EmployeeCrComponent.prototype.cancel = function () {
        this.router.navigate(['/employee']);
    };
    EmployeeCrComponent = __decorate([
        core_1.Component({
            selector: 'app-employee-cr',
            template: __webpack_require__("./src/app/employee/employee-cr/employee-cr.component.html"),
            styles: [__webpack_require__("./src/app/employee/employee-cr/employee-cr.component.css")]
        }),
        __metadata("design:paramtypes", [employee_service_1.EmployeeService, router_1.ActivatedRoute, forms_1.FormBuilder, router_1.Router])
    ], EmployeeCrComponent);
    return EmployeeCrComponent;
}());
exports.EmployeeCrComponent = EmployeeCrComponent;


/***/ }),

/***/ "./src/app/employee/employee-cr/employee-cr.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var common_1 = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
var EmployeeCrModule = /** @class */ (function () {
    function EmployeeCrModule() {
    }
    EmployeeCrModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule
            ],
            declarations: []
        })
    ], EmployeeCrModule);
    return EmployeeCrModule;
}());
exports.EmployeeCrModule = EmployeeCrModule;


/***/ }),

/***/ "./src/app/employee/employee-list/employee-binding-directive.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var kendo_angular_grid_1 = __webpack_require__("./node_modules/@progress/kendo-angular-grid/dist/es/index.js");
var employee_service_1 = __webpack_require__("./src/app/employee/employee.service.ts");
var EmployeeBindingDirectiveDirective = /** @class */ (function (_super) {
    __extends(EmployeeBindingDirectiveDirective, _super);
    function EmployeeBindingDirectiveDirective(employeeService, grid) {
        var _this = _super.call(this, grid) || this;
        _this.employeeService = employeeService;
        return _this;
    }
    EmployeeBindingDirectiveDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.serviceSubscription = this.employeeService.getEmployees().subscribe(function (data) {
            _this.grid.data = data;
            _this.notifyDataChange();
        });
        _super.prototype.ngOnInit.call(this);
        this.rebind();
    };
    EmployeeBindingDirectiveDirective.prototype.ngOnDestroy = function () {
        if (this.serviceSubscription) {
            this.serviceSubscription.unsubscribe();
        }
        _super.prototype.ngOnDestroy.call(this);
    };
    EmployeeBindingDirectiveDirective.prototype.rebind = function () {
        // this.employeeService.getEmployees().qu
    };
    EmployeeBindingDirectiveDirective = __decorate([
        core_1.Directive({
            selector: '[appEmployeeBindingDirective]'
        }),
        __metadata("design:paramtypes", [employee_service_1.EmployeeService, kendo_angular_grid_1.GridComponent])
    ], EmployeeBindingDirectiveDirective);
    return EmployeeBindingDirectiveDirective;
}(kendo_angular_grid_1.DataBindingDirective));
exports.EmployeeBindingDirectiveDirective = EmployeeBindingDirectiveDirective;


/***/ }),

/***/ "./src/app/employee/employee-list/employee-list.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/employee/employee-list/employee-list.component.html":
/***/ (function(module, exports) {

module.exports = "<h2>Employee List</h2>\r\n\r\n<p>  <button class=\"btn-success\" [routerLink]=\"['/employee/add']\">Create</button></p>\r\n<!--<table class=\"table table-striped\" *ngIf=\"empList\">\r\n  <thead>\r\n    <tr>\r\n      <th>ID</th>\r\n      <th>Name</th>\r\n      <th>Gender</th>\r\n      <th>Department</th>\r\n      <th>City</th>\r\n    </tr>\r\n  </thead>\r\n  <tbody>\r\n    <tr *ngFor=\"let emp of empList\">\r\n      <td>{{emp.id}}</td>\r\n      <td>{{emp.name}}</td>\r\n      <td>{{emp.gender}}</td>\r\n      <td>{{emp.department}}</td>\r\n      <td>{{emp.city}}</td>\r\n      <td>\r\n        <a [routerLink]=\"['/employee/edit/', emp.id]\">Edit</a> |\r\n        <a [routerLink]=\"\" (click)=\"delete(emp.id)\">Delete</a>\r\n      </td>\r\n    </tr>\r\n  </tbody>\r\n</table>-->\r\n<!--<input type=\"text\" class=\"form-control\" id=\"filterName\" name=\"filterName\" (ngModelChange)=\"filter()\"/>-->\r\n<kendo-grid [data]=\"gridView\"\r\n            [pageSize]=\"gridState.take\"\r\n            [skip]=\"gridState.skip\"\r\n            [sort]=\"gridState.sort\"\r\n            [filter] =\"gridState.filter\"\r\n            [filterable]=\"true\"\r\n            [pageable]=\"true\"\r\n            [sortable]=\"true\"\r\n            (dataStateChange)=\"onStateChange($event)\"\r\n            [height]=\"350\">\r\n  <kendo-grid-column field=\"name\" title=\"Name\" width=\"250\"></kendo-grid-column>\r\n  <kendo-grid-column field=\"email\" title=\"Email\" width=\"230\"></kendo-grid-column>\r\n  <kendo-grid-column field=\"city\" title=\"City\" width=\"130\"></kendo-grid-column>\r\n  <kendo-grid-column field=\"department\" title=\"Department\" width=\"130\"></kendo-grid-column>\r\n  <kendo-grid-column field=\"phone\" title=\"Phone\" width=\"80\"></kendo-grid-column>\r\n  <kendo-grid-column field=\"gender\" title=\"Gender\" width=\"80\">  </kendo-grid-column>\r\n  <kendo-grid-column field=\"id\" title=\"Action\" width=\"100\" [sortable]=\"false\" [filterable]=\"false\">\r\n    <ng-template kendoGridCellTemplate let-dataItem>\r\n      <button class=\"btn-success\" [routerLink]=\"['/employee/edit/', dataItem.id]\">Edit</button>\r\n      <button class=\"btn-success\" [routerLink]=\"\" (click)=\"delete(dataItem.id)\">Remove</button>\r\n    </ng-template>\r\n  </kendo-grid-column>\r\n</kendo-grid>\r\n"

/***/ }),

/***/ "./src/app/employee/employee-list/employee-list.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var employee_service_1 = __webpack_require__("./src/app/employee/employee.service.ts");
var array_operators_1 = __webpack_require__("./node_modules/@progress/kendo-data-query/dist/npm/array.operators.js");
var EmployeeListComponent = /** @class */ (function () {
    function EmployeeListComponent(employeeService, router, activatedRoute) {
        this.employeeService = employeeService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.multiple = false;
        this.allowUnsort = true;
        this.skip = 0;
        this.sort = [{
                field: 'Name',
                dir: 'asc'
            }];
        this.gridState = {
            sort: [],
            skip: 0,
            take: 5,
            // Initial filter descriptor
            filter: {
                logic: 'and',
                filters: [{ field: 'Name', operator: 'contains', value: '' }]
            }
        };
    }
    EmployeeListComponent.prototype.ngOnInit = function () {
        this.getEmployees();
    };
    EmployeeListComponent.prototype.getEmployees = function () {
        var _this = this;
        this.employeeService.getEmployees().subscribe(function (data) {
            _this.result = data;
            _this.gridView = array_operators_1.process(data, _this.gridState);
        });
    };
    EmployeeListComponent.prototype.onStateChange = function (state) {
        this.gridState = state;
        this.getEmployees();
    };
    EmployeeListComponent.prototype.filter = function () {
        //this.getEmployees(this.result.filter(a => a.Name == this.filter));
    };
    EmployeeListComponent.prototype.delete = function (employeeID) {
        var _this = this;
        var ans = confirm("Do you want to delete customer with Id: " + employeeID);
        if (ans) {
            this.employeeService.deleteEmployee(employeeID).subscribe(function (data) {
                _this.getEmployees();
            }, function (error) { return console.error(error); });
        }
    };
    EmployeeListComponent = __decorate([
        core_1.Component({
            selector: 'app-employee-list',
            template: __webpack_require__("./src/app/employee/employee-list/employee-list.component.html"),
            styles: [__webpack_require__("./src/app/employee/employee-list/employee-list.component.css")]
        }),
        __metadata("design:paramtypes", [employee_service_1.EmployeeService, router_1.Router, router_1.ActivatedRoute])
    ], EmployeeListComponent);
    return EmployeeListComponent;
}());
exports.EmployeeListComponent = EmployeeListComponent;


/***/ }),

/***/ "./src/app/employee/employee-list/employee-list.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var common_1 = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
var employee_service_1 = __webpack_require__("./src/app/employee/employee.service.ts");
//import { EmployeeBindingDirectiveDirective } from './employee-binding-directive.directive';
var EmployeeListModule = /** @class */ (function () {
    function EmployeeListModule() {
    }
    EmployeeListModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule
            ],
            declarations: [],
            providers: [employee_service_1.EmployeeService]
        })
    ], EmployeeListModule);
    return EmployeeListModule;
}());
exports.EmployeeListModule = EmployeeListModule;


/***/ }),

/***/ "./src/app/employee/employee.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var Observable_1 = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
var http_1 = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
__webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
__webpack_require__("./node_modules/rxjs/_esm5/add/operator/catch.js");
__webpack_require__("./node_modules/rxjs/_esm5/add/observable/throw.js");
var config_service_1 = __webpack_require__("./src/app/shared/utils/config.service.ts");
var user_service_1 = __webpack_require__("./src/app/user/user.service.ts");
var EmployeeService = /** @class */ (function () {
    function EmployeeService(http, _configService, userService) {
        this.http = http;
        this._configService = _configService;
        this.userService = userService;
        this.baseUrl = _configService.getApiUrl();
    }
    EmployeeService.prototype.getEmployees = function () {
        var s = this.userService.getAuthHttpOptions();
        return this.http.get(this.getAbsouluteUrl('/api/employee/index'), this.userService.getAuthHttpOptions()).map(function (response) { return response; }).catch(this.errorHandler);
    };
    EmployeeService.prototype.getEmployeeById = function (id) {
        return this.http.get(this.getAbsouluteUrl('/api/employee/detail/' + id), this.userService.getAuthHttpOptions()).map(function (response) { return response; }).catch(this.errorHandler);
    };
    EmployeeService.prototype.addEmployee = function (employee) {
        return this.http.post(this.getAbsouluteUrl('/api/employee/add'), employee, this.userService.getAuthHttpOptions()).map(function (response) { return response; }).catch(this.errorHandler);
    };
    EmployeeService.prototype.updateEmployee = function (employee) {
        return this.http.post(this.getAbsouluteUrl('/api/employee/edit'), employee, this.userService.getAuthHttpOptions()).map(function (response) { return response; }).catch(this.errorHandler);
    };
    EmployeeService.prototype.deleteEmployee = function (id) {
        return this.http.delete(this.getAbsouluteUrl('/api/employee/delete/' + id), this.userService.getAuthHttpOptions()).map(function (response) { return response; }).catch(this.errorHandler);
    };
    EmployeeService.prototype.getAbsouluteUrl = function (path) {
        var directory = this.baseUrl + path;
        return directory;
    };
    EmployeeService.prototype.errorHandler = function (error) {
        console.log(error);
        return Observable_1.Observable.throw(error);
    };
    EmployeeService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient, config_service_1.ConfigService, user_service_1.UserService])
    ], EmployeeService);
    return EmployeeService;
}());
exports.EmployeeService = EmployeeService;


/***/ }),

/***/ "./src/app/error/e-401/e-401.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/error/e-401/e-401.component.html":
/***/ (function(module, exports) {

module.exports = "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n  <!-- Simple HttpErrorPages | MIT License | https://github.com/AndiDittrich/HttpErrorPages -->\r\n  <meta charset=\"utf-8\" />\r\n  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\r\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\r\n  <title>We've got some trouble | 401 - Unauthorized</title>\r\n  <style type=\"text/css\">\r\n    /*! normalize.css v5.0.0 | MIT License | github.com/necolas/normalize.css */\r\n\r\n    html {\r\n      font-family: sans-serif;\r\n      line-height: 1.15;\r\n      -ms-text-size-adjust: 100%;\r\n      -webkit-text-size-adjust: 100%\r\n    }\r\n\r\n    body {\r\n      margin: 0\r\n    }\r\n\r\n    article, aside, footer, header, nav, section {\r\n      display: block\r\n    }\r\n\r\n    h1 {\r\n      font-size: 2em;\r\n      margin: .67em 0\r\n    }\r\n\r\n    figcaption, figure, main {\r\n      display: block\r\n    }\r\n\r\n    figure {\r\n      margin: 1em 40px\r\n    }\r\n\r\n    hr {\r\n      box-sizing: content-box;\r\n      height: 0;\r\n      overflow: visible\r\n    }\r\n\r\n    pre {\r\n      font-family: monospace,monospace;\r\n      font-size: 1em\r\n    }\r\n\r\n    a {\r\n      background-color: transparent;\r\n      -webkit-text-decoration-skip: objects\r\n    }\r\n\r\n      a:active, a:hover {\r\n        outline-width: 0\r\n      }\r\n\r\n    abbr[title] {\r\n      border-bottom: none;\r\n      text-decoration: underline;\r\n      text-decoration: underline dotted\r\n    }\r\n\r\n    b, strong {\r\n      font-weight: inherit\r\n    }\r\n\r\n    b, strong {\r\n      font-weight: bolder\r\n    }\r\n\r\n    code, kbd, samp {\r\n      font-family: monospace,monospace;\r\n      font-size: 1em\r\n    }\r\n\r\n    dfn {\r\n      font-style: italic\r\n    }\r\n\r\n    mark {\r\n      background-color: #ff0;\r\n      color: #000\r\n    }\r\n\r\n    small {\r\n      font-size: 80%\r\n    }\r\n\r\n    sub, sup {\r\n      font-size: 75%;\r\n      line-height: 0;\r\n      position: relative;\r\n      vertical-align: baseline\r\n    }\r\n\r\n    sub {\r\n      bottom: -.25em\r\n    }\r\n\r\n    sup {\r\n      top: -.5em\r\n    }\r\n\r\n    audio, video {\r\n      display: inline-block\r\n    }\r\n\r\n      audio:not([controls]) {\r\n        display: none;\r\n        height: 0\r\n      }\r\n\r\n    img {\r\n      border-style: none\r\n    }\r\n\r\n    svg:not(:root) {\r\n      overflow: hidden\r\n    }\r\n\r\n    button, input, optgroup, select, textarea {\r\n      font-family: sans-serif;\r\n      font-size: 100%;\r\n      line-height: 1.15;\r\n      margin: 0\r\n    }\r\n\r\n    button, input {\r\n      overflow: visible\r\n    }\r\n\r\n    button, select {\r\n      text-transform: none\r\n    }\r\n\r\n    [type=reset], [type=submit], button, html [type=button] {\r\n      -webkit-appearance: button\r\n    }\r\n\r\n      [type=button]::-moz-focus-inner, [type=reset]::-moz-focus-inner, [type=submit]::-moz-focus-inner, button::-moz-focus-inner {\r\n        border-style: none;\r\n        padding: 0\r\n      }\r\n\r\n      [type=button]:-moz-focusring, [type=reset]:-moz-focusring, [type=submit]:-moz-focusring, button:-moz-focusring {\r\n        outline: 1px dotted ButtonText\r\n      }\r\n\r\n    fieldset {\r\n      border: 1px solid silver;\r\n      margin: 0 2px;\r\n      padding: .35em .625em .75em\r\n    }\r\n\r\n    legend {\r\n      box-sizing: border-box;\r\n      color: inherit;\r\n      display: table;\r\n      max-width: 100%;\r\n      padding: 0;\r\n      white-space: normal\r\n    }\r\n\r\n    progress {\r\n      display: inline-block;\r\n      vertical-align: baseline\r\n    }\r\n\r\n    textarea {\r\n      overflow: auto\r\n    }\r\n\r\n    [type=checkbox], [type=radio] {\r\n      box-sizing: border-box;\r\n      padding: 0\r\n    }\r\n\r\n    [type=number]::-webkit-inner-spin-button, [type=number]::-webkit-outer-spin-button {\r\n      height: auto\r\n    }\r\n\r\n    [type=search] {\r\n      -webkit-appearance: textfield;\r\n      outline-offset: -2px\r\n    }\r\n\r\n      [type=search]::-webkit-search-cancel-button, [type=search]::-webkit-search-decoration {\r\n        -webkit-appearance: none\r\n      }\r\n\r\n    ::-webkit-file-upload-button {\r\n      -webkit-appearance: button;\r\n      font: inherit\r\n    }\r\n\r\n    details, menu {\r\n      display: block\r\n    }\r\n\r\n    summary {\r\n      display: list-item\r\n    }\r\n\r\n    canvas {\r\n      display: inline-block\r\n    }\r\n\r\n    template {\r\n      display: none\r\n    }\r\n\r\n    [hidden] {\r\n      display: none\r\n    }\r\n    /*! Simple HttpErrorPages | MIT X11 License | https://github.com/AndiDittrich/HttpErrorPages */\r\n\r\n    body, html {\r\n      width: 100%;\r\n      height: 100%;\r\n      background-color: #21232a\r\n    }\r\n\r\n    body {\r\n      color: #fff;\r\n      text-align: center;\r\n      text-shadow: 0 2px 4px rgba(0,0,0,.5);\r\n      padding: 0;\r\n      min-height: 100%;\r\n      -webkit-box-shadow: inset 0 0 100px rgba(0,0,0,.8);\r\n      box-shadow: inset 0 0 100px rgba(0,0,0,.8);\r\n      display: table;\r\n      font-family: \"Open Sans\",Arial,sans-serif\r\n    }\r\n\r\n    h1 {\r\n      font-family: inherit;\r\n      font-weight: 500;\r\n      line-height: 1.1;\r\n      color: inherit;\r\n      font-size: 36px\r\n    }\r\n\r\n      h1 small {\r\n        font-size: 68%;\r\n        font-weight: 400;\r\n        line-height: 1;\r\n        color: #777\r\n      }\r\n\r\n    a {\r\n      text-decoration: none;\r\n      color: #fff;\r\n      font-size: inherit;\r\n      border-bottom: dotted 1px #707070\r\n    }\r\n\r\n    .lead {\r\n      color: silver;\r\n      font-size: 21px;\r\n      line-height: 1.4\r\n    }\r\n\r\n    .cover {\r\n      display: table-cell;\r\n      vertical-align: middle;\r\n      padding: 0 20px\r\n    }\r\n\r\n    footer {\r\n      position: fixed;\r\n      width: 100%;\r\n      height: 40px;\r\n      left: 0;\r\n      bottom: 0;\r\n      color: #a0a0a0;\r\n      font-size: 14px\r\n    }\r\n  </style>\r\n</head>\r\n<body>\r\n  <div class=\"cover\"><h1>Unauthorized <small>Error 401</small></h1><p class=\"lead\">The requested resource requires an authentication.</p></div>\r\n  <footer><p>Technical Contact: <a href=\"mailto:x@example.com\">x@example.com</a></p></footer>\r\n</body>\r\n</html>\r\n"

/***/ }),

/***/ "./src/app/error/e-401/e-401.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var E401Component = /** @class */ (function () {
    function E401Component() {
    }
    E401Component.prototype.ngOnInit = function () {
    };
    E401Component = __decorate([
        core_1.Component({
            selector: 'app-e-401',
            template: __webpack_require__("./src/app/error/e-401/e-401.component.html"),
            styles: [__webpack_require__("./src/app/error/e-401/e-401.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], E401Component);
    return E401Component;
}());
exports.E401Component = E401Component;


/***/ }),

/***/ "./src/app/error/e-403/e-403.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/error/e-403/e-403.component.html":
/***/ (function(module, exports) {

module.exports = "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n  <!-- Simple HttpErrorPages | MIT License | https://github.com/AndiDittrich/HttpErrorPages -->\r\n  <meta charset=\"utf-8\" />\r\n  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\r\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\r\n  <title>We've got some trouble | 403 - Access Denied</title>\r\n  <style type=\"text/css\">\r\n    /*! normalize.css v5.0.0 | MIT License | github.com/necolas/normalize.css */\r\n\r\n    html {\r\n      font-family: sans-serif;\r\n      line-height: 1.15;\r\n      -ms-text-size-adjust: 100%;\r\n      -webkit-text-size-adjust: 100%\r\n    }\r\n\r\n    body {\r\n      margin: 0\r\n    }\r\n\r\n    article, aside, footer, header, nav, section {\r\n      display: block\r\n    }\r\n\r\n    h1 {\r\n      font-size: 2em;\r\n      margin: .67em 0\r\n    }\r\n\r\n    figcaption, figure, main {\r\n      display: block\r\n    }\r\n\r\n    figure {\r\n      margin: 1em 40px\r\n    }\r\n\r\n    hr {\r\n      box-sizing: content-box;\r\n      height: 0;\r\n      overflow: visible\r\n    }\r\n\r\n    pre {\r\n      font-family: monospace,monospace;\r\n      font-size: 1em\r\n    }\r\n\r\n    a {\r\n      background-color: transparent;\r\n      -webkit-text-decoration-skip: objects\r\n    }\r\n\r\n      a:active, a:hover {\r\n        outline-width: 0\r\n      }\r\n\r\n    abbr[title] {\r\n      border-bottom: none;\r\n      text-decoration: underline;\r\n      text-decoration: underline dotted\r\n    }\r\n\r\n    b, strong {\r\n      font-weight: inherit\r\n    }\r\n\r\n    b, strong {\r\n      font-weight: bolder\r\n    }\r\n\r\n    code, kbd, samp {\r\n      font-family: monospace,monospace;\r\n      font-size: 1em\r\n    }\r\n\r\n    dfn {\r\n      font-style: italic\r\n    }\r\n\r\n    mark {\r\n      background-color: #ff0;\r\n      color: #000\r\n    }\r\n\r\n    small {\r\n      font-size: 80%\r\n    }\r\n\r\n    sub, sup {\r\n      font-size: 75%;\r\n      line-height: 0;\r\n      position: relative;\r\n      vertical-align: baseline\r\n    }\r\n\r\n    sub {\r\n      bottom: -.25em\r\n    }\r\n\r\n    sup {\r\n      top: -.5em\r\n    }\r\n\r\n    audio, video {\r\n      display: inline-block\r\n    }\r\n\r\n      audio:not([controls]) {\r\n        display: none;\r\n        height: 0\r\n      }\r\n\r\n    img {\r\n      border-style: none\r\n    }\r\n\r\n    svg:not(:root) {\r\n      overflow: hidden\r\n    }\r\n\r\n    button, input, optgroup, select, textarea {\r\n      font-family: sans-serif;\r\n      font-size: 100%;\r\n      line-height: 1.15;\r\n      margin: 0\r\n    }\r\n\r\n    button, input {\r\n      overflow: visible\r\n    }\r\n\r\n    button, select {\r\n      text-transform: none\r\n    }\r\n\r\n    [type=reset], [type=submit], button, html [type=button] {\r\n      -webkit-appearance: button\r\n    }\r\n\r\n      [type=button]::-moz-focus-inner, [type=reset]::-moz-focus-inner, [type=submit]::-moz-focus-inner, button::-moz-focus-inner {\r\n        border-style: none;\r\n        padding: 0\r\n      }\r\n\r\n      [type=button]:-moz-focusring, [type=reset]:-moz-focusring, [type=submit]:-moz-focusring, button:-moz-focusring {\r\n        outline: 1px dotted ButtonText\r\n      }\r\n\r\n    fieldset {\r\n      border: 1px solid silver;\r\n      margin: 0 2px;\r\n      padding: .35em .625em .75em\r\n    }\r\n\r\n    legend {\r\n      box-sizing: border-box;\r\n      color: inherit;\r\n      display: table;\r\n      max-width: 100%;\r\n      padding: 0;\r\n      white-space: normal\r\n    }\r\n\r\n    progress {\r\n      display: inline-block;\r\n      vertical-align: baseline\r\n    }\r\n\r\n    textarea {\r\n      overflow: auto\r\n    }\r\n\r\n    [type=checkbox], [type=radio] {\r\n      box-sizing: border-box;\r\n      padding: 0\r\n    }\r\n\r\n    [type=number]::-webkit-inner-spin-button, [type=number]::-webkit-outer-spin-button {\r\n      height: auto\r\n    }\r\n\r\n    [type=search] {\r\n      -webkit-appearance: textfield;\r\n      outline-offset: -2px\r\n    }\r\n\r\n      [type=search]::-webkit-search-cancel-button, [type=search]::-webkit-search-decoration {\r\n        -webkit-appearance: none\r\n      }\r\n\r\n    ::-webkit-file-upload-button {\r\n      -webkit-appearance: button;\r\n      font: inherit\r\n    }\r\n\r\n    details, menu {\r\n      display: block\r\n    }\r\n\r\n    summary {\r\n      display: list-item\r\n    }\r\n\r\n    canvas {\r\n      display: inline-block\r\n    }\r\n\r\n    template {\r\n      display: none\r\n    }\r\n\r\n    [hidden] {\r\n      display: none\r\n    }\r\n    /*! Simple HttpErrorPages | MIT X11 License | https://github.com/AndiDittrich/HttpErrorPages */\r\n\r\n    body, html {\r\n      width: 100%;\r\n      height: 100%;\r\n      background-color: #21232a\r\n    }\r\n\r\n    body {\r\n      color: #fff;\r\n      text-align: center;\r\n      text-shadow: 0 2px 4px rgba(0,0,0,.5);\r\n      padding: 0;\r\n      min-height: 100%;\r\n      -webkit-box-shadow: inset 0 0 100px rgba(0,0,0,.8);\r\n      box-shadow: inset 0 0 100px rgba(0,0,0,.8);\r\n      display: table;\r\n      font-family: \"Open Sans\",Arial,sans-serif\r\n    }\r\n\r\n    h1 {\r\n      font-family: inherit;\r\n      font-weight: 500;\r\n      line-height: 1.1;\r\n      color: inherit;\r\n      font-size: 36px\r\n    }\r\n\r\n      h1 small {\r\n        font-size: 68%;\r\n        font-weight: 400;\r\n        line-height: 1;\r\n        color: #777\r\n      }\r\n\r\n    a {\r\n      text-decoration: none;\r\n      color: #fff;\r\n      font-size: inherit;\r\n      border-bottom: dotted 1px #707070\r\n    }\r\n\r\n    .lead {\r\n      color: silver;\r\n      font-size: 21px;\r\n      line-height: 1.4\r\n    }\r\n\r\n    .cover {\r\n      display: table-cell;\r\n      vertical-align: middle;\r\n      padding: 0 20px\r\n    }\r\n\r\n    footer {\r\n      position: fixed;\r\n      width: 100%;\r\n      height: 40px;\r\n      left: 0;\r\n      bottom: 0;\r\n      color: #a0a0a0;\r\n      font-size: 14px\r\n    }\r\n  </style>\r\n</head>\r\n<body>\r\n  <div class=\"cover\"><h1>Access Denied <small>Error 403</small></h1><p class=\"lead\">The requested resource requires an authentication.</p></div>\r\n  <footer><p>Technical Contact: <a href=\"mailto:x@example.com\">x@example.com</a></p></footer>\r\n</body>\r\n</html>\r\n"

/***/ }),

/***/ "./src/app/error/e-403/e-403.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var E403Component = /** @class */ (function () {
    function E403Component() {
    }
    E403Component.prototype.ngOnInit = function () {
    };
    E403Component = __decorate([
        core_1.Component({
            selector: 'app-e-403',
            template: __webpack_require__("./src/app/error/e-403/e-403.component.html"),
            styles: [__webpack_require__("./src/app/error/e-403/e-403.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], E403Component);
    return E403Component;
}());
exports.E403Component = E403Component;


/***/ }),

/***/ "./src/app/main/main.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/main/main.component.html":
/***/ (function(module, exports) {

module.exports = "\r\n<app-navbar></app-navbar>\r\n<!--<app-sidebar></app-sidebar>-->\r\n<app-content></app-content>\r\n\r\n<!-- Jquery Core Js -->\r\n<script src=\"assets/plugins/jquery/jquery.min.js\"></script>\r\n\r\n<!-- Bootstrap Core Js -->\r\n<script src=\"assets/plugins/bootstrap/js/bootstrap.js\"></script>\r\n\r\n<!-- Select Plugin Js -->\r\n<!-- <script src=\"plugins/bootstrap-select/js/bootstrap-select.js\"></script> -->\r\n<!-- Slimscroll Plugin Js -->\r\n<script src=\"assets/plugins/jquery-slimscroll/jquery.slimscroll.js\"></script>\r\n\r\n<!-- Waves Effect Plugin Js -->\r\n<script src=\"assets/plugins/node-waves/waves.js\"></script>\r\n\r\n<!-- Jquery CountTo Plugin Js -->\r\n<script src=\"assets/plugins/jquery-countto/jquery.countTo.js\"></script>\r\n\r\n<script src=\"assets/js/admin.js\"></script>\r\n<script src=\"assets/js/pages/index.js\"></script>\r\n"

/***/ }),

/***/ "./src/app/main/main.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var MainComponent = /** @class */ (function () {
    function MainComponent() {
    }
    MainComponent.prototype.ngOnInit = function () {
    };
    MainComponent = __decorate([
        core_1.Component({
            selector: 'app-main',
            template: __webpack_require__("./src/app/main/main.component.html"),
            styles: [__webpack_require__("./src/app/main/main.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], MainComponent);
    return MainComponent;
}());
exports.MainComponent = MainComponent;


/***/ }),

/***/ "./src/app/navbar/navbar.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/navbar/navbar.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- navbar.component.html -->\r\n<!-- Page Loader -->\r\n<!-- <div class=\"page-loader-wrapper\">\r\n    <div class=\"loader\">\r\n        <div class=\"preloader\">\r\n            <div class=\"spinner-layer pl-red\">\r\n                <div class=\"circle-clipper left\">\r\n                    <div class=\"circle\"></div>\r\n                </div>\r\n                <div class=\"circle-clipper right\">\r\n                    <div class=\"circle\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <p>Please wait...</p>\r\n    </div>\r\n</div> -->\r\n<div class=\"overlay\"></div>\r\n<!-- Search Bar -->\r\n<div class=\"search-bar\">\r\n  <div class=\"search-icon\">\r\n    <i class=\"material-icons\">search</i>\r\n  </div>\r\n  <input type=\"text\" placeholder=\"START TYPING...\">\r\n  <div class=\"close-search\">\r\n    <i class=\"material-icons\">close</i>\r\n  </div>\r\n</div>\r\n<!-- #END# Search Bar -->\r\n<!-- Top Bar -->\r\n<nav class=\"navbar\">\r\n  <div class=\"container-fluid\">\r\n    <div class=\"navbar-header\">\r\n      <a href=\"javascript:void(0);\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar-collapse\" aria-expanded=\"false\"></a>\r\n      <a href=\"javascript:void(0);\" class=\"bars\"></a>\r\n      <a class=\"navbar-brand\" routerLink=\"/dashboard\">ASP.NET Core 2.0 & Angular 5</a>\r\n    </div>\r\n    <div class=\"collapse navbar-collapse\" id=\"navbar-collapse\">\r\n      <ul class=\"nav navbar-nav navbar-right\">\r\n        <!-- Call Search -->\r\n        <li>\r\n          <a routerLink=\"/home\">Home |</a>\r\n        </li>\r\n        <li><a routerLink=\"/myprofile\">My Profile |</a></li>\r\n        <li><a routerLink=\"/employee\">Employee</a></li>\r\n        <li><a href=\"javascript:void(0);\" class=\"js-search\" data-close=\"true\"><i class=\"material-icons\">search</i></a></li>\r\n        <!-- #END# Call Search -->\r\n        <!-- Notifications -->\r\n        <li class=\"dropdown\">\r\n          <a href=\"javascript:void(0);\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\">\r\n            <i class=\"material-icons\">notifications</i>\r\n            <span class=\"label-count\">7</span>\r\n          </a>\r\n          <ul class=\"dropdown-menu\">\r\n            <li class=\"header\">NOTIFICATIONS</li>\r\n            <li class=\"body\">\r\n              <ul class=\"menu\">\r\n                <li>\r\n                  <a href=\"javascript:void(0);\">\r\n                    <div class=\"icon-circle bg-light-green\">\r\n                      <i class=\"material-icons\">person_add</i>\r\n                    </div>\r\n                    <div class=\"menu-info\">\r\n                      <h4>12 new members joined</h4>\r\n                      <p>\r\n                        <i class=\"material-icons\">access_time</i> 14 mins ago\r\n                      </p>\r\n                    </div>\r\n                  </a>\r\n                </li>\r\n                <li>\r\n                  <a href=\"javascript:void(0);\">\r\n                    <div class=\"icon-circle bg-cyan\">\r\n                      <i class=\"material-icons\">add_shopping_cart</i>\r\n                    </div>\r\n                    <div class=\"menu-info\">\r\n                      <h4>4 sales made</h4>\r\n                      <p>\r\n                        <i class=\"material-icons\">access_time</i> 22 mins ago\r\n                      </p>\r\n                    </div>\r\n                  </a>\r\n                </li>\r\n                <li>\r\n                  <a href=\"javascript:void(0);\">\r\n                    <div class=\"icon-circle bg-red\">\r\n                      <i class=\"material-icons\">delete_forever</i>\r\n                    </div>\r\n                    <div class=\"menu-info\">\r\n                      <h4><b>Nancy Doe</b> deleted account</h4>\r\n                      <p>\r\n                        <i class=\"material-icons\">access_time</i> 3 hours ago\r\n                      </p>\r\n                    </div>\r\n                  </a>\r\n                </li>\r\n                <li>\r\n                  <a href=\"javascript:void(0);\">\r\n                    <div class=\"icon-circle bg-orange\">\r\n                      <i class=\"material-icons\">mode_edit</i>\r\n                    </div>\r\n                    <div class=\"menu-info\">\r\n                      <h4><b>Nancy</b> changed name</h4>\r\n                      <p>\r\n                        <i class=\"material-icons\">access_time</i> 2 hours ago\r\n                      </p>\r\n                    </div>\r\n                  </a>\r\n                </li>\r\n                <li>\r\n                  <a href=\"javascript:void(0);\">\r\n                    <div class=\"icon-circle bg-blue-grey\">\r\n                      <i class=\"material-icons\">comment</i>\r\n                    </div>\r\n                    <div class=\"menu-info\">\r\n                      <h4><b>John</b> commented your post</h4>\r\n                      <p>\r\n                        <i class=\"material-icons\">access_time</i> 4 hours ago\r\n                      </p>\r\n                    </div>\r\n                  </a>\r\n                </li>\r\n                <li>\r\n                  <a href=\"javascript:void(0);\">\r\n                    <div class=\"icon-circle bg-light-green\">\r\n                      <i class=\"material-icons\">cached</i>\r\n                    </div>\r\n                    <div class=\"menu-info\">\r\n                      <h4><b>John</b> updated status</h4>\r\n                      <p>\r\n                        <i class=\"material-icons\">access_time</i> 3 hours ago\r\n                      </p>\r\n                    </div>\r\n                  </a>\r\n                </li>\r\n                <li>\r\n                  <a href=\"javascript:void(0);\">\r\n                    <div class=\"icon-circle bg-purple\">\r\n                      <i class=\"material-icons\">settings</i>\r\n                    </div>\r\n                    <div class=\"menu-info\">\r\n                      <h4>Settings updated</h4>\r\n                      <p>\r\n                        <i class=\"material-icons\">access_time</i> Yesterday\r\n                      </p>\r\n                    </div>\r\n                  </a>\r\n                </li>\r\n              </ul>\r\n            </li>\r\n            <li class=\"footer\">\r\n              <a href=\"javascript:void(0);\">View All Notifications</a>\r\n            </li>\r\n          </ul>\r\n        </li>\r\n        <!-- #END# Notifications -->\r\n        <!-- Tasks -->\r\n        <li class=\"dropdown\">\r\n          <a href=\"javascript:void(0);\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\">\r\n            <i class=\"material-icons\">flag</i>\r\n            <span class=\"label-count\">9</span>\r\n          </a>\r\n          <ul class=\"dropdown-menu\">\r\n            <li class=\"header\">TASKS</li>\r\n            <li class=\"body\">\r\n              <ul class=\"menu tasks\">\r\n                <li>\r\n                  <a href=\"javascript:void(0);\">\r\n                    <h4>\r\n                      Footer display issue\r\n                      <small>32%</small>\r\n                    </h4>\r\n                    <div class=\"progress\">\r\n                      <div class=\"progress-bar bg-pink\" role=\"progressbar\" aria-valuenow=\"85\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 32%\">\r\n                      </div>\r\n                    </div>\r\n                  </a>\r\n                </li>\r\n                <li>\r\n                  <a href=\"javascript:void(0);\">\r\n                    <h4>\r\n                      Make new buttons\r\n                      <small>45%</small>\r\n                    </h4>\r\n                    <div class=\"progress\">\r\n                      <div class=\"progress-bar bg-cyan\" role=\"progressbar\" aria-valuenow=\"85\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 45%\">\r\n                      </div>\r\n                    </div>\r\n                  </a>\r\n                </li>\r\n                <li>\r\n                  <a href=\"javascript:void(0);\">\r\n                    <h4>\r\n                      Create new dashboard\r\n                      <small>54%</small>\r\n                    </h4>\r\n                    <div class=\"progress\">\r\n                      <div class=\"progress-bar bg-teal\" role=\"progressbar\" aria-valuenow=\"85\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 54%\">\r\n                      </div>\r\n                    </div>\r\n                  </a>\r\n                </li>\r\n                <li>\r\n                  <a href=\"javascript:void(0);\">\r\n                    <h4>\r\n                      Solve transition issue\r\n                      <small>65%</small>\r\n                    </h4>\r\n                    <div class=\"progress\">\r\n                      <div class=\"progress-bar bg-orange\" role=\"progressbar\" aria-valuenow=\"85\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 65%\">\r\n                      </div>\r\n                    </div>\r\n                  </a>\r\n                </li>\r\n                <li>\r\n                  <a href=\"javascript:void(0);\">\r\n                    <h4>\r\n                      Answer GitHub questions\r\n                      <small>92%</small>\r\n                    </h4>\r\n                    <div class=\"progress\">\r\n                      <div class=\"progress-bar bg-purple\" role=\"progressbar\" aria-valuenow=\"85\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 92%\">\r\n                      </div>\r\n                    </div>\r\n                  </a>\r\n                </li>\r\n              </ul>\r\n            </li>\r\n            <li class=\"footer\">\r\n              <a href=\"javascript:void(0);\">View All Tasks</a>\r\n            </li>\r\n          </ul>\r\n        </li>\r\n        <!-- #END# Tasks -->\r\n        <li class=\"pull-right\"><a href=\"javascript:void(0);\" class=\"js-right-sidebar\" data-close=\"true\"><i class=\"material-icons\">more_vert</i></a></li>\r\n        <li><a (click)=\"logout()\" style=\"cursor:pointer\">Logout</a></li>\r\n      </ul>\r\n    </div>\r\n  </div>\r\n</nav>\r\n<!-- #Top Bar -->\r\n"

/***/ }),

/***/ "./src/app/navbar/navbar.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var user_service_1 = __webpack_require__("./src/app/user/user.service.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(userService, router, activatedRoute) {
        this.userService = userService;
        this.router = router;
        this.activatedRoute = activatedRoute;
    }
    NavbarComponent.prototype.ngOnInit = function () {
    };
    NavbarComponent.prototype.logout = function () {
        this.userService.logout();
        this.router.navigate(['/login']);
    };
    NavbarComponent = __decorate([
        core_1.Component({
            selector: 'app-navbar',
            template: __webpack_require__("./src/app/navbar/navbar.component.html"),
            styles: [__webpack_require__("./src/app/navbar/navbar.component.css")]
        }),
        __metadata("design:paramtypes", [user_service_1.UserService, router_1.Router, router_1.ActivatedRoute])
    ], NavbarComponent);
    return NavbarComponent;
}());
exports.NavbarComponent = NavbarComponent;


/***/ }),

/***/ "./src/app/shared/utils/config.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var ConfigService = /** @class */ (function () {
    function ConfigService() {
        this._apiUrl = 'http://localhost:49222';
    }
    ConfigService.prototype.getApiUrl = function () {
        return this._apiUrl;
    };
    ConfigService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], ConfigService);
    return ConfigService;
}());
exports.ConfigService = ConfigService;


/***/ }),

/***/ "./src/app/shared/validation/PasswordValidator.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PasswordValidator = /** @class */ (function () {
    function PasswordValidator() {
    }
    PasswordValidator.MatchPassword = function (AC) {
        var password = AC.get('password').value; // to get value in input tag
        var confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
        if (password != confirmPassword) {
            console.log('false');
            AC.get('confirmPassword').setErrors({ MatchPassword: true });
        }
        else {
            console.log('true');
            return null;
        }
    };
    // Inspired on: http://plnkr.co/edit/Zcbg2T3tOxYmhxs7vaAm?p=preview
    PasswordValidator.areEqual = function (formGroup) {
        var value;
        var valid = true;
        for (var key in formGroup.controls) {
            if (formGroup.controls.hasOwnProperty(key)) {
                var control = formGroup.controls[key];
                if (value === undefined) {
                    value = control.value;
                }
                else {
                    if (value !== control.value) {
                        valid = false;
                        break;
                    }
                }
            }
        }
        if (valid) {
            return null;
        }
        return {
            areEqual: true
        };
    };
    return PasswordValidator;
}());
exports.PasswordValidator = PasswordValidator;


/***/ }),

/***/ "./src/app/sidebar/sidebar.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/sidebar/sidebar.component.html":
/***/ (function(module, exports) {

module.exports = "<section>\r\n  <!-- Left Sidebar -->\r\n  <aside id=\"leftsidebar\" class=\"sidebar\">\r\n    <!-- User Info -->\r\n    <div class=\"user-info\">\r\n      <div class=\"image\">\r\n        <img src=\"assets/images/user.png\" width=\"48\" height=\"48\" alt=\"User\" />\r\n      </div>\r\n      <div class=\"info-container\">\r\n        <div class=\"name\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">John Doe</div>\r\n        <div class=\"email\">john.doe@example.com</div>\r\n        <div class=\"btn-group user-helper-dropdown\">\r\n          <i class=\"material-icons\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"true\">keyboard_arrow_down</i>\r\n          <ul class=\"dropdown-menu pull-right\">\r\n            <li><a href=\"javascript:void(0);\"><i class=\"material-icons\">person</i>Profile</a></li>\r\n            <li role=\"seperator\" class=\"divider\"></li>\r\n            <li><a href=\"javascript:void(0);\"><i class=\"material-icons\">group</i>Followers</a></li>\r\n            <li><a href=\"javascript:void(0);\"><i class=\"material-icons\">shopping_cart</i>Sales</a></li>\r\n            <li><a href=\"javascript:void(0);\"><i class=\"material-icons\">favorite</i>Likes</a></li>\r\n            <li role=\"seperator\" class=\"divider\"></li>\r\n            <li><a href=\"javascript:void(0);\"><i class=\"material-icons\">input</i>Sign Out</a></li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <!-- #User Info -->\r\n    <!-- Menu -->\r\n    <div class=\"menu\">\r\n      <ul class=\"list\">\r\n        <li class=\"header\">MAIN NAVIGATION</li>\r\n        <li class=\"active\">\r\n\r\n          <a href=\"#\">\r\n            <i class=\"material-icons\">home</i>\r\n            <span>Home</span>\r\n          </a>\r\n        </li>\r\n        <li>\r\n          <a href=\"javascript:void(0);\" class=\"menu-toggle\">\r\n            <i class=\"material-icons\">view_list</i>\r\n            <span>Users</span>\r\n          </a>\r\n          <ul class=\"ml-menu\">\r\n            <li>\r\n              <a href=\"#\">Admin</a>\r\n            </li>\r\n            <li>\r\n              <a href=\"pages/tables/jquery-datatable.html\">Customers</a>\r\n            </li>\r\n            <li>\r\n              <a href=\"pages/tables/editable-table.html\">Suppliers</a>\r\n            </li>\r\n          </ul>\r\n        </li>\r\n        <li>\r\n          <a href=\"pages/helper-classes.html\">\r\n            <i class=\"material-icons\">layers</i>\r\n            <span>Helper Classes</span>\r\n          </a>\r\n        </li>\r\n        <li>\r\n          <a href=\"javascript:void(0);\" class=\"menu-toggle\">\r\n            <i class=\"material-icons\">widgets</i>\r\n            <span>Widgets</span>\r\n          </a>\r\n          <ul class=\"ml-menu\">\r\n            <li>\r\n              <a href=\"javascript:void(0);\" class=\"menu-toggle\">\r\n                <span>Cards</span>\r\n              </a>\r\n              <ul class=\"ml-menu\">\r\n                <li>\r\n                  <a href=\"pages/widgets/cards/basic.html\">Basic</a>\r\n                </li>\r\n                <li>\r\n                  <a href=\"pages/widgets/cards/colored.html\">Colored</a>\r\n                </li>\r\n                <li>\r\n                  <a href=\"pages/widgets/cards/no-header.html\">No Header</a>\r\n                </li>\r\n              </ul>\r\n            </li>\r\n            <li>\r\n              <a href=\"javascript:void(0);\" class=\"menu-toggle\">\r\n                <span>Infobox</span>\r\n              </a>\r\n              <ul class=\"ml-menu\">\r\n                <li>\r\n                  <a href=\"pages/widgets/infobox/infobox-1.html\">Infobox-1</a>\r\n                </li>\r\n                <li>\r\n                  <a href=\"pages/widgets/infobox/infobox-2.html\">Infobox-2</a>\r\n                </li>\r\n                <li>\r\n                  <a href=\"pages/widgets/infobox/infobox-3.html\">Infobox-3</a>\r\n                </li>\r\n                <li>\r\n                  <a href=\"pages/widgets/infobox/infobox-4.html\">Infobox-4</a>\r\n                </li>\r\n                <li>\r\n                  <a href=\"pages/widgets/infobox/infobox-5.html\">Infobox-5</a>\r\n                </li>\r\n              </ul>\r\n            </li>\r\n          </ul>\r\n        </li>\r\n        <li>\r\n          <a href=\"javascript:void(0);\" class=\"menu-toggle\">\r\n            <i class=\"material-icons\">swap_calls</i>\r\n            <span>User Interface (UI)</span>\r\n          </a>\r\n          <ul class=\"ml-menu\">\r\n            <li>\r\n              <a href=\"pages/ui/alerts.html\">Alerts</a>\r\n            </li>\r\n            <li>\r\n              <a href=\"pages/ui/animations.html\">Animations</a>\r\n            </li>\r\n            <li>\r\n              <a href=\"pages/ui/badges.html\">Badges</a>\r\n            </li>\r\n\r\n            <li>\r\n              <a href=\"pages/ui/breadcrumbs.html\">Breadcrumbs</a>\r\n            </li>\r\n            <li>\r\n              <a href=\"pages/ui/buttons.html\">Buttons</a>\r\n            </li>\r\n            <li>\r\n              <a href=\"pages/ui/collapse.html\">Collapse</a>\r\n            </li>\r\n            <li>\r\n              <a href=\"pages/ui/colors.html\">Colors</a>\r\n            </li>\r\n            <li>\r\n              <a href=\"pages/ui/dialogs.html\">Dialogs</a>\r\n            </li>\r\n            <li>\r\n              <a href=\"pages/ui/icons.html\">Icons</a>\r\n            </li>\r\n            <li>\r\n              <a href=\"pages/ui/labels.html\">Labels</a>\r\n            </li>\r\n            <li>\r\n              <a href=\"pages/ui/list-group.html\">List Group</a>\r\n            </li>\r\n            <li>\r\n              <a href=\"pages/ui/media-object.html\">Media Object</a>\r\n            </li>\r\n            <li>\r\n              <a href=\"pages/ui/modals.html\">Modals</a>\r\n            </li>\r\n            <li>\r\n              <a href=\"pages/ui/notifications.html\">Notifications</a>\r\n            </li>\r\n            <li>\r\n              <a href=\"pages/ui/pagination.html\">Pagination</a>\r\n            </li>\r\n            <li>\r\n              <a href=\"pages/ui/preloaders.html\">Preloaders</a>\r\n            </li>\r\n            <li>\r\n              <a href=\"pages/ui/progressbars.html\">Progress Bars</a>\r\n            </li>\r\n            <li>\r\n              <a href=\"pages/ui/range-sliders.html\">Range Sliders</a>\r\n            </li>\r\n            <li>\r\n              <a href=\"pages/ui/sortable-nestable.html\">Sortable & Nestable</a>\r\n            </li>\r\n            <li>\r\n              <a href=\"pages/ui/tabs.html\">Tabs</a>\r\n            </li>\r\n            <li>\r\n              <a href=\"pages/ui/thumbnails.html\">Thumbnails</a>\r\n            </li>\r\n            <li>\r\n              <a href=\"pages/ui/tooltips-popovers.html\">Tooltips & Popovers</a>\r\n            </li>\r\n            <li>\r\n              <a href=\"pages/ui/waves.html\">Waves</a>\r\n            </li>\r\n          </ul>\r\n        </li>\r\n        <li>\r\n          <a href=\"javascript:void(0);\" class=\"menu-toggle\">\r\n            <i class=\"material-icons\">assignment</i>\r\n            <span>Forms</span>\r\n          </a>\r\n          <ul class=\"ml-menu\">\r\n            <li>\r\n              <a href=\"pages/forms/basic-form-elements.html\">Basic Form Elements</a>\r\n            </li>\r\n            <li>\r\n              <a href=\"pages/forms/advanced-form-elements.html\">Advanced Form Elements</a>\r\n            </li>\r\n            <li>\r\n              <a href=\"pages/forms/form-examples.html\">Form Examples</a>\r\n            </li>\r\n            <li>\r\n              <a href=\"pages/forms/form-validation.html\">Form Validation</a>\r\n            </li>\r\n            <li>\r\n              <a href=\"pages/forms/form-wizard.html\">Form Wizard</a>\r\n            </li>\r\n            <li>\r\n              <a href=\"pages/forms/editors.html\">Editors</a>\r\n            </li>\r\n          </ul>\r\n        </li>\r\n        <li>\r\n          <a href=\"javascript:void(0);\" class=\"menu-toggle\">\r\n            <i class=\"material-icons\">view_list</i>\r\n            <span>Tables</span>\r\n          </a>\r\n          <ul class=\"ml-menu\">\r\n            <li>\r\n              <a href=\"pages/tables/normal-tables.html\">Normal Tables</a>\r\n            </li>\r\n            <li>\r\n              <a href=\"pages/tables/jquery-datatable.html\">Jquery Datatables</a>\r\n            </li>\r\n            <li>\r\n              <a href=\"pages/tables/editable-table.html\">Editable Tables</a>\r\n            </li>\r\n          </ul>\r\n        </li>\r\n        <li>\r\n          <a href=\"javascript:void(0);\" class=\"menu-toggle\">\r\n            <i class=\"material-icons\">perm_media</i>\r\n            <span>Medias</span>\r\n          </a>\r\n          <ul class=\"ml-menu\">\r\n            <li>\r\n              <a href=\"pages/medias/image-gallery.html\">Image Gallery</a>\r\n            </li>\r\n            <li>\r\n              <a href=\"pages/medias/carousel.html\">Carousel</a>\r\n            </li>\r\n          </ul>\r\n        </li>\r\n        <li>\r\n          <a href=\"javascript:void(0);\" class=\"menu-toggle\">\r\n            <i class=\"material-icons\">pie_chart</i>\r\n            <span>Charts</span>\r\n          </a>\r\n          <ul class=\"ml-menu\">\r\n            <li>\r\n              <a href=\"pages/charts/morris.html\">Morris</a>\r\n            </li>\r\n            <li>\r\n              <a href=\"pages/charts/flot.html\">Flot</a>\r\n            </li>\r\n            <li>\r\n              <a href=\"pages/charts/chartjs.html\">ChartJS</a>\r\n            </li>\r\n            <li>\r\n              <a href=\"pages/charts/sparkline.html\">Sparkline</a>\r\n            </li>\r\n            <li>\r\n              <a href=\"pages/charts/jquery-knob.html\">Jquery Knob</a>\r\n            </li>\r\n          </ul>\r\n        </li>\r\n        <li>\r\n          <a href=\"javascript:void(0);\" class=\"menu-toggle\">\r\n            <i class=\"material-icons\">content_copy</i>\r\n            <span>Example Pages</span>\r\n          </a>\r\n          <ul class=\"ml-menu\">\r\n            <li>\r\n              <a href=\"pages/examples/sign-in.html\">Sign In</a>\r\n            </li>\r\n            <li>\r\n              <a href=\"pages/examples/sign-up.html\">Sign Up</a>\r\n            </li>\r\n            <li>\r\n              <a href=\"pages/examples/forgot-password.html\">Forgot Password</a>\r\n            </li>\r\n            <li>\r\n              <a href=\"pages/examples/blank.html\">Blank Page</a>\r\n            </li>\r\n            <li>\r\n              <a href=\"pages/examples/404.html\">404 - Not Found</a>\r\n            </li>\r\n            <li>\r\n              <a href=\"pages/examples/500.html\">500 - Server Error</a>\r\n            </li>\r\n          </ul>\r\n        </li>\r\n        <li>\r\n          <a href=\"javascript:void(0);\" class=\"menu-toggle\">\r\n            <i class=\"material-icons\">map</i>\r\n            <span>Maps</span>\r\n          </a>\r\n          <ul class=\"ml-menu\">\r\n            <li>\r\n              <a href=\"pages/maps/google.html\">Google Map</a>\r\n            </li>\r\n            <li>\r\n              <a href=\"pages/maps/yandex.html\">YandexMap</a>\r\n            </li>\r\n            <li>\r\n              <a href=\"pages/maps/jvectormap.html\">jVectorMap</a>\r\n            </li>\r\n          </ul>\r\n        </li>\r\n        <li>\r\n          <a href=\"javascript:void(0);\" class=\"menu-toggle\">\r\n            <i class=\"material-icons\">trending_down</i>\r\n            <span>Multi Level Menu</span>\r\n          </a>\r\n          <ul class=\"ml-menu\">\r\n            <li>\r\n              <a href=\"javascript:void(0);\">\r\n                <span>Menu Item</span>\r\n              </a>\r\n            </li>\r\n            <li>\r\n              <a href=\"javascript:void(0);\">\r\n                <span>Menu Item - 2</span>\r\n              </a>\r\n            </li>\r\n            <li>\r\n              <a href=\"javascript:void(0);\" class=\"menu-toggle\">\r\n                <span>Level - 2</span>\r\n              </a>\r\n              <ul class=\"ml-menu\">\r\n                <li>\r\n                  <a href=\"javascript:void(0);\">\r\n                    <span>Menu Item</span>\r\n                  </a>\r\n                </li>\r\n                <li>\r\n                  <a href=\"javascript:void(0);\" class=\"menu-toggle\">\r\n                    <span>Level - 3</span>\r\n                  </a>\r\n                  <ul class=\"ml-menu\">\r\n                    <li>\r\n                      <a href=\"javascript:void(0);\">\r\n                        <span>Level - 4</span>\r\n                      </a>\r\n                    </li>\r\n                  </ul>\r\n                </li>\r\n              </ul>\r\n            </li>\r\n          </ul>\r\n        </li>\r\n        <li>\r\n          <a href=\"pages/changelogs.html\">\r\n            <i class=\"material-icons\">update</i>\r\n            <span>Changelogs</span>\r\n          </a>\r\n        </li>\r\n        <li class=\"header\">LABELS</li>\r\n        <li>\r\n          <a href=\"javascript:void(0);\">\r\n            <i class=\"material-icons col-red\">donut_large</i>\r\n            <span>Important</span>\r\n          </a>\r\n        </li>\r\n        <li>\r\n          <a href=\"javascript:void(0);\">\r\n            <i class=\"material-icons col-amber\">donut_large</i>\r\n            <span>Warning</span>\r\n          </a>\r\n        </li>\r\n        <li>\r\n          <a href=\"javascript:void(0);\">\r\n            <i class=\"material-icons col-light-blue\">donut_large</i>\r\n            <span>Information</span>\r\n          </a>\r\n        </li>\r\n      </ul>\r\n    </div>\r\n    <!-- #Menu -->\r\n    <!-- Footer -->\r\n    <div class=\"legal\">\r\n      <div class=\"copyright\">\r\n        &copy; 2016 <a href=\"javascript:void(0);\">AdminBSB - Material Design</a>.\r\n      </div>\r\n      <div class=\"version\">\r\n        <b>Version: </b> 1.0.4\r\n      </div>\r\n    </div>\r\n    <!-- #Footer -->\r\n  </aside>\r\n  <!-- #END# Left Sidebar -->\r\n  <!-- Right Sidebar -->\r\n  <aside id=\"rightsidebar\" class=\"right-sidebar\">\r\n    <ul class=\"nav nav-tabs tab-nav-right\" role=\"tablist\">\r\n      <li role=\"presentation\" class=\"active\"><a href=\"#skins\" data-toggle=\"tab\">SKINS</a></li>\r\n      <li role=\"presentation\"><a href=\"#settings\" data-toggle=\"tab\">SETTINGS</a></li>\r\n    </ul>\r\n    <div class=\"tab-content\">\r\n      <div role=\"tabpanel\" class=\"tab-pane fade in active in active\" id=\"skins\">\r\n        <ul class=\"demo-choose-skin\">\r\n          <li data-theme=\"red\" class=\"active\">\r\n            <div class=\"red\"></div>\r\n            <span>Red</span>\r\n          </li>\r\n          <li data-theme=\"pink\">\r\n            <div class=\"pink\"></div>\r\n            <span>Pink</span>\r\n          </li>\r\n          <li data-theme=\"purple\">\r\n            <div class=\"purple\"></div>\r\n            <span>Purple</span>\r\n          </li>\r\n          <li data-theme=\"deep-purple\">\r\n            <div class=\"deep-purple\"></div>\r\n            <span>Deep Purple</span>\r\n          </li>\r\n          <li data-theme=\"indigo\">\r\n            <div class=\"indigo\"></div>\r\n            <span>Indigo</span>\r\n          </li>\r\n          <li data-theme=\"blue\">\r\n            <div class=\"blue\"></div>\r\n            <span>Blue</span>\r\n          </li>\r\n          <li data-theme=\"light-blue\">\r\n            <div class=\"light-blue\"></div>\r\n            <span>Light Blue</span>\r\n          </li>\r\n          <li data-theme=\"cyan\">\r\n            <div class=\"cyan\"></div>\r\n            <span>Cyan</span>\r\n          </li>\r\n          <li data-theme=\"teal\">\r\n            <div class=\"teal\"></div>\r\n            <span>Teal</span>\r\n          </li>\r\n          <li data-theme=\"green\">\r\n            <div class=\"green\"></div>\r\n            <span>Green</span>\r\n          </li>\r\n          <li data-theme=\"light-green\">\r\n            <div class=\"light-green\"></div>\r\n            <span>Light Green</span>\r\n          </li>\r\n          <li data-theme=\"lime\">\r\n            <div class=\"lime\"></div>\r\n            <span>Lime</span>\r\n          </li>\r\n          <li data-theme=\"yellow\">\r\n            <div class=\"yellow\"></div>\r\n            <span>Yellow</span>\r\n          </li>\r\n          <li data-theme=\"amber\">\r\n            <div class=\"amber\"></div>\r\n            <span>Amber</span>\r\n          </li>\r\n          <li data-theme=\"orange\">\r\n            <div class=\"orange\"></div>\r\n            <span>Orange</span>\r\n          </li>\r\n          <li data-theme=\"deep-orange\">\r\n            <div class=\"deep-orange\"></div>\r\n            <span>Deep Orange</span>\r\n          </li>\r\n          <li data-theme=\"brown\">\r\n            <div class=\"brown\"></div>\r\n            <span>Brown</span>\r\n          </li>\r\n          <li data-theme=\"grey\">\r\n            <div class=\"grey\"></div>\r\n            <span>Grey</span>\r\n          </li>\r\n          <li data-theme=\"blue-grey\">\r\n            <div class=\"blue-grey\"></div>\r\n            <span>Blue Grey</span>\r\n          </li>\r\n          <li data-theme=\"black\">\r\n            <div class=\"black\"></div>\r\n            <span>Black</span>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n      <div role=\"tabpanel\" class=\"tab-pane fade\" id=\"settings\">\r\n        <div class=\"demo-settings\">\r\n          <p>GENERAL SETTINGS</p>\r\n          <ul class=\"setting-list\">\r\n            <li>\r\n              <span>Report Panel Usage</span>\r\n              <div class=\"switch\">\r\n                <label><input type=\"checkbox\" checked><span class=\"lever\"></span></label>\r\n              </div>\r\n            </li>\r\n            <li>\r\n              <span>Email Redirect</span>\r\n              <div class=\"switch\">\r\n                <label><input type=\"checkbox\"><span class=\"lever\"></span></label>\r\n              </div>\r\n            </li>\r\n          </ul>\r\n          <p>SYSTEM SETTINGS</p>\r\n          <ul class=\"setting-list\">\r\n            <li>\r\n              <span>Notifications</span>\r\n              <div class=\"switch\">\r\n                <label><input type=\"checkbox\" checked><span class=\"lever\"></span></label>\r\n              </div>\r\n            </li>\r\n            <li>\r\n              <span>Auto Updates</span>\r\n              <div class=\"switch\">\r\n                <label><input type=\"checkbox\" checked><span class=\"lever\"></span></label>\r\n              </div>\r\n            </li>\r\n          </ul>\r\n          <p>ACCOUNT SETTINGS</p>\r\n          <ul class=\"setting-list\">\r\n            <li>\r\n              <span>Offline</span>\r\n              <div class=\"switch\">\r\n                <label><input type=\"checkbox\"><span class=\"lever\"></span></label>\r\n              </div>\r\n            </li>\r\n            <li>\r\n              <span>Location Permission</span>\r\n              <div class=\"switch\">\r\n                <label><input type=\"checkbox\" checked><span class=\"lever\"></span></label>\r\n              </div>\r\n            </li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </aside>\r\n  <!-- #END# Right Sidebar -->\r\n</section>\r\n"

/***/ }),

/***/ "./src/app/sidebar/sidebar.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var SidebarComponent = /** @class */ (function () {
    function SidebarComponent() {
    }
    SidebarComponent.prototype.ngOnInit = function () {
    };
    SidebarComponent = __decorate([
        core_1.Component({
            selector: 'app-sidebar',
            template: __webpack_require__("./src/app/sidebar/sidebar.component.html"),
            styles: [__webpack_require__("./src/app/sidebar/sidebar.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], SidebarComponent);
    return SidebarComponent;
}());
exports.SidebarComponent = SidebarComponent;


/***/ }),

/***/ "./src/app/user/login/login.component.css":
/***/ (function(module, exports) {

module.exports = ".login{\r\n  text-align:center;\r\n}\r\n"

/***/ }),

/***/ "./src/app/user/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "\r\n<div class=\"col-md-6 col-md-offset-3\">\r\n  <h2>Login</h2>\r\n  <form name=\"form\" (ngSubmit)=\"login(f)\" #f=\"ngForm\" novalidate>\r\n    <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !username.valid }\">\r\n      <label for=\"username\">Username</label>\r\n      <input type=\"text\" class=\"form-control\" name=\"username\" [(ngModel)]=\"credentials.username\" #username=\"ngModel\" required />\r\n      <div *ngIf=\"f.submitted && !username.valid\" class=\"help-block\">Username is required</div>\r\n    </div>\r\n    <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !password.valid }\">\r\n      <label for=\"password\">Password</label>\r\n      <input type=\"password\" class=\"form-control\" name=\"password\" [(ngModel)]=\"credentials.password\" #password=\"ngModel\" placeholder=\"Password\" required />\r\n      <div *ngIf=\"f.submitted && !password.valid\" class=\"help-block\">Password is required</div>\r\n    </div>\r\n    <div *ngIf=\"errors\" class=\"alert alert-danger\" role=\"alert\">\r\n      {{errors}}\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <button [disabled]=\"loading\" class=\"btn btn-primary\">Login</button>\r\n    </div>\r\n  </form>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/user/login/login.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var user_service_1 = __webpack_require__("./src/app/user/user.service.ts");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(userService, router, activatedRoute) {
        this.userService = userService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.submitted = false;
        this._userAuthStoreKey = "currentUser";
        this.credentials = { username: '', password: '' };
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.login = function (_a) {
        var _this = this;
        var value = _a.value, valid = _a.valid;
        this.submitted = true;
        this.isRequesting = true;
        this.errors = '';
        if (valid) {
            this.userService.login(value.username, value.password)
                .subscribe(function (result) {
                if (result.access_token) {
                    _this.router.navigate(['/home']);
                    //this.router.navigate(['/MyProfile', { fullName: this.fullName }])
                }
                else {
                    _this.errors = result.message;
                }
            }, function (error) { return _this.errors = error.error; });
        }
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            template: __webpack_require__("./src/app/user/login/login.component.html"),
            styles: [__webpack_require__("./src/app/user/login/login.component.css")]
        }),
        __metadata("design:paramtypes", [user_service_1.UserService, router_1.Router, router_1.ActivatedRoute])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;


/***/ }),

/***/ "./src/app/user/login/login.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var common_1 = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
var user_service_1 = __webpack_require__("./src/app/user/user.service.ts");
var LoginModule = /** @class */ (function () {
    function LoginModule() {
    }
    LoginModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule
            ],
            providers: [user_service_1.UserService],
            declarations: []
        })
    ], LoginModule);
    return LoginModule;
}());
exports.LoginModule = LoginModule;


/***/ }),

/***/ "./src/app/user/profile/profile-detail/profile-detail.component.css":
/***/ (function(module, exports) {

module.exports = ".profile{\r\n  text-align:center;\r\n}\r\n"

/***/ }),

/***/ "./src/app/user/profile/profile-detail/profile-detail.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"profile\">\r\n  <div><h4>UserName: {{userName}}</h4></div>\r\n  <div><h4>Join Date: {{joinDate}}</h4></div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/user/profile/profile-detail/profile-detail.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var ProfileDetailComponent = /** @class */ (function () {
    function ProfileDetailComponent() {
    }
    ProfileDetailComponent.prototype.ngOnInit = function () {
        var user = JSON.parse(localStorage.getItem('currentUser'));
        this.userName = user.userName;
        this.joinDate = user.joingDate;
    };
    ProfileDetailComponent = __decorate([
        core_1.Component({
            selector: 'app-profile-detail',
            template: __webpack_require__("./src/app/user/profile/profile-detail/profile-detail.component.html"),
            styles: [__webpack_require__("./src/app/user/profile/profile-detail/profile-detail.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], ProfileDetailComponent);
    return ProfileDetailComponent;
}());
exports.ProfileDetailComponent = ProfileDetailComponent;


/***/ }),

/***/ "./src/app/user/profile/profile-detail/profile-detail.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var common_1 = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
var ProfileDetailModule = /** @class */ (function () {
    function ProfileDetailModule() {
    }
    ProfileDetailModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule
            ],
            declarations: []
        })
    ], ProfileDetailModule);
    return ProfileDetailModule;
}());
exports.ProfileDetailModule = ProfileDetailModule;


/***/ }),

/***/ "./src/app/user/profile/profile.component.css":
/***/ (function(module, exports) {

module.exports = ".profile{\r\n  text-align:center;\r\n}\r\n"

/***/ }),

/***/ "./src/app/user/profile/profile.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div class=\"profile\">\n  <h2>Welcome {{fullName}}</h2> \n</div>\n"

/***/ }),

/***/ "./src/app/user/profile/profile.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var user_service_1 = __webpack_require__("./src/app/user/user.service.ts");
var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(route, userService, router) {
        this.route = route;
        this.userService = userService;
        this.router = router;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var user = JSON.parse(localStorage.getItem('currentUser'));
            _this.id = user.Id;
            _this.fullName = user.fullName;
        });
    };
    ProfileComponent = __decorate([
        core_1.Component({
            selector: 'app-profile',
            template: __webpack_require__("./src/app/user/profile/profile.component.html"),
            styles: [__webpack_require__("./src/app/user/profile/profile.component.css")]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, user_service_1.UserService, router_1.Router])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;


/***/ }),

/***/ "./src/app/user/profile/profile.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var common_1 = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
var user_service_1 = __webpack_require__("./src/app/user/user.service.ts");
var ProfileModule = /** @class */ (function () {
    function ProfileModule() {
    }
    ProfileModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule
            ],
            declarations: [],
            providers: [user_service_1.UserService],
        })
    ], ProfileModule);
    return ProfileModule;
}());
exports.ProfileModule = ProfileModule;


/***/ }),

/***/ "./src/app/user/user.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Rx_1 = __webpack_require__("./node_modules/rxjs/_esm5/Rx.js");
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
var http_2 = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
__webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
var config_service_1 = __webpack_require__("./src/app/shared/utils/config.service.ts");
var angular2_jwt_1 = __webpack_require__("./node_modules/angular2-jwt/angular2-jwt.js");
var Role = /** @class */ (function () {
    function Role(roles) {
        this.roles = roles;
    }
    Role.prototype.contains = function (role) {
        return this.roles.some(function (p) { return p.toLowerCase() === role.toLowerCase(); });
    };
    return Role;
}());
exports.Role = Role;
var UserService = /** @class */ (function () {
    function UserService(http, _configService) {
        this.http = http;
        this._configService = _configService;
        this._userAuthStoreKey = "currentUser";
        this.baseUrl = '';
        this.baseUrl = _configService.getApiUrl();
    }
    UserService.prototype.login = function (userName, password) {
        var _this = this;
        var headers = new http_2.HttpHeaders({ 'Content-type': 'application/json' });
        var body = JSON.stringify({ username: userName, password: password });
        return this.http.post(this.getAbsouluteUrl("/api/user/login"), body, { headers: headers })
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var user = response; //response.json();
            var helper = new angular2_jwt_1.JwtHelper();
            var payLoad = helper.decodeToken(response.access_token);
            user.id = payLoad["Id"];
            user.joingDate = payLoad["date"];
            user.fullName = payLoad["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"];
            user.userName = userName;
            user.roles = payLoad["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
            if (user && user.access_token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem(_this._userAuthStoreKey, JSON.stringify(user));
            }
            return response;
        }).catch(function (err) {
            console.log(err.statusText);
            return Rx_1.Observable.throw(err);
        });
    };
    UserService.prototype.getUserById = function (id) {
        return this.http.get(this.getAbsouluteUrl("/api/user/get" + id)).map(function (response) { return response.json; });
    };
    UserService.prototype.getAbsouluteUrl = function (path) {
        var directory = this.baseUrl + path;
        return directory;
    };
    UserService.prototype.logout = function () {
        localStorage.removeItem(this._userAuthStoreKey);
    };
    // private helper methods
    UserService.prototype.jwt = function () {
        // create authorization header with jwt token
        var currentUser = JSON.parse(localStorage.getItem(this._userAuthStoreKey));
        if (currentUser && currentUser.token) {
            var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new http_1.RequestOptions({ headers: headers });
        }
    };
    UserService.prototype.getToken = function () {
        var authInfo = this.getAuthInfo();
        if (authInfo == null) {
            return null;
        }
        return authInfo.access_token;
    };
    UserService.prototype.getAuthInfo = function () {
        var userAuthString = localStorage.getItem(this._userAuthStoreKey);
        if (userAuthString === null) {
            return null;
        }
        return JSON.parse(userAuthString);
    };
    UserService.prototype.getAuthHttpOptions = function () {
        var headers = new http_2.HttpHeaders({ 'Content-type': 'application/json', 'Authorization': 'Bearer ' + this.getToken() });
        return { headers: headers };
    };
    UserService.prototype.isLoggined = function () {
        var userAuthString = localStorage.getItem(this._userAuthStoreKey);
        if (userAuthString === null)
            return false;
        else
            return true;
    };
    UserService.prototype.getroles = function () {
        var authInfo = this.getAuthInfo();
        if (authInfo == null)
            return null;
        else
            return authInfo.roles;
    };
    UserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_2.HttpClient, config_service_1.ConfigService])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;


/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var platform_browser_dynamic_1 = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
var app_module_1 = __webpack_require__("./src/app/app.module.ts");
var environment_1 = __webpack_require__("./src/environments/environment.ts");
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule)
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map