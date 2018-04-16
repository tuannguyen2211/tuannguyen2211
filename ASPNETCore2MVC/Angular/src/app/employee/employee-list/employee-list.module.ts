import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../employee.service';
//import { EmployeeBindingDirectiveDirective } from './employee-binding-directive.directive';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [EmployeeService]
})
export class EmployeeListModule { }
