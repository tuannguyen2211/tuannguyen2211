import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProfileComponent } from './user/profile/profile.component';
import { LoginComponent } from './user/login/login.component';
import { Route } from '@angular/compiler/src/core';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from '../app/user/login/login.module';
import { ProfileModule } from '../app/user/profile/profile.module';
import { ProfileDetailModule } from '../app/user/profile/profile-detail/profile-detail.module';
import { EmployeeListModule } from '../app/employee/employee-list/employee-list.module';
import { EmployeeCrModule } from '../app/employee/employee-cr/employee-cr.module';
import { HttpClientModule } from '@angular/common/http';
import { ConfigService } from './shared/utils/config.service';
import { AuthGuard, AuthorizationGuard } from '../app/_guards/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileDetailComponent } from './user/profile/profile-detail/profile-detail.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmployeeCrComponent } from './employee/employee-cr/employee-cr.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentComponent } from './content/content.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { EmployeeBindingDirectiveDirective } from '../app/employee/employee-list/employee-binding-directive.directive';
// Import the Animations module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main/main.component';
import { E401Component } from './error/e-401/e-401.component';
import { E403Component } from './error/e-403/e-403.component';
@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LoginComponent,
    ProfileDetailComponent,
    EmployeeListComponent,
    EmployeeCrComponent,
    NavbarComponent,
    SidebarComponent,
    ContentComponent,
    EmployeeBindingDirectiveDirective,
    MainComponent,
    E401Component,
    E403Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    LoginModule,
    ProfileModule,
    ProfileDetailModule,
    EmployeeListModule,
    EmployeeCrModule,
    AppRoutingModule,
    HttpClientModule,
    GridModule,
    BrowserAnimationsModule
  ],
  providers: [ConfigService, AuthGuard, AuthorizationGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
