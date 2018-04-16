import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl, FormGroupName } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { employeeData } from '../../shared/models/employeeData';
import * as libphonenumber from 'google-libphonenumber';
import { error } from 'util';
import { FormControlName } from '@angular/forms/src/directives/reactive_directives/form_control_name';
import { PasswordValidator } from '../../shared/validation/PasswordValidator';
import { PhoneValidator } from '../../shared/validation/phoneValidator';
@Component({
  selector: 'app-employee-cr',
  templateUrl: './employee-cr.component.html',
  styleUrls: ['./employee-cr.component.css']
})
export class EmployeeCrComponent implements OnInit {
  id: number = 0;
  title: string = 'Create';
  employeeForm: FormGroup;
  matching_passwords: FormGroup;
  errorMessage: any
  constructor(private employeeService: EmployeeService, private _avRoute: ActivatedRoute, private _form: FormBuilder, private router: Router) {
    if (this._avRoute.snapshot.params["id"]) {
      this.id = this._avRoute.snapshot.params["id"];
    }
    this.employeeForm = this._form.group({
      id: 0,
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      phone: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') //this is for the letters (both uppercase and lowercase) and numbers validation
      ])),
      confirmPassword: new FormControl('', Validators.required),
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
      gender: new FormControl('', Validators.required),
      department: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required)
    },
      {
        validator: PasswordValidator.MatchPassword
      })
  }

  ngOnInit() {
    if (this.id > 0) {
      this.title = "Edit";
      this.employeeService.getEmployeeById(this.id).subscribe(
        result => {
          this.employeeForm.setValue({
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
            }
        , error => this.errorMessage = error);
    }
   // else {
      //this.employeeForm = 
   // }
  }
  save() {
    if (this.employeeForm.valid) {
      if (this.id > 0) {
        this.employeeService.updateEmployee(this.employeeForm.value).subscribe((data) => {
          this.router.navigate(['/employee']);
        }, error => this.errorMessage = error)
      }
      else {
        this.employeeService.addEmployee(this.employeeForm.value).subscribe((data) => {
          this.router.navigate(['/employee']);
        }, error => this.errorMessage = error)
      }
    }
  }
  cancel() {
    this.router.navigate(['/employee']);
  }

  employee_validation_messages = {
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
  }

  //get name() { return this.employeeForm.get('name'); }
  //get gender() { return this.employeeForm.get('gender'); }
  //get department() { return this.employeeForm.get('department'); }
  //get city() { return this.employeeForm.get('city'); }  
}
