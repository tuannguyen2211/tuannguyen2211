import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './user/profile/profile.component';
import { ProfileDetailComponent } from './user/profile/profile-detail/profile-detail.component';
import { LoginComponent } from './user/login/login.component';
import { MainComponent } from '../app/main/main.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmployeeCrComponent } from './employee/employee-cr/employee-cr.component';
import { NavbarComponent } from './navbar/navbar.component';
import { E401Component } from '../app/error/e-401/e-401.component';
import { E403Component } from '../app/error/e-403/e-403.component';
import { AuthGuard, AuthorizationGuard } from '../app/_guards/auth.guard';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: MainComponent,
    "canActivate": [AuthGuard], 
    //pathMatch: 'full'
    children: [
      {
        path: 'home',
        component: ProfileComponent
      },
      {
        path: 'myprofile',
        component: ProfileDetailComponent,
        "canActivate": [AuthorizationGuard],
        "data": {
          'listRoles': ["BA"]
        }
      },
      {
        path: 'employee',
        component: EmployeeListComponent
      },
      {
        path: 'employee/add',
        component: EmployeeCrComponent
      },
      {
        path: 'employee/edit/:id',
        component: EmployeeCrComponent
      },
      {
        path: '401',
        component: E401Component
      },
      {
        path: '403',
        component: E403Component
      },
      {
        path: '**',
        redirectTo: 'home'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
