
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { employeeData } from '../../shared/models/employeeData';
import { DataSourceRequestState, SortDescriptor, orderBy, State } from '@progress/kendo-data-query';
import { GridDataResult, PageChangeEvent , DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query/dist/npm/array.operators';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent  {
  public multiple = false;
  public allowUnsort = true;
  public skip = 0;
  private eService: EmployeeService;
  result: any[];
  public sort: SortDescriptor[] = [{
    field: 'Name',
    dir: 'asc'
  }];
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 5,
    // Initial filter descriptor
    filter: {
      logic: 'and',
      filters: [{ field: 'Name', operator: 'contains', value: '' }]
    }
  };
  public empList: employeeData[];
  public gridView: GridDataResult;
  constructor(private employeeService: EmployeeService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getEmployees();
  }
  getEmployees() {
    this.employeeService.getEmployees().subscribe(data => {
      this.result = data;
      this.gridView = process(data, this.gridState);
    });

  }
  public onStateChange(state: State): void {
    this.gridState = state;
    this.getEmployees();
  }
  filter() {
    //this.getEmployees(this.result.filter(a => a.Name == this.filter));
  }
  delete(employeeID) {
    var ans = confirm("Do you want to delete customer with Id: " + employeeID);
    if (ans) {
      this.employeeService.deleteEmployee(employeeID).subscribe((data) => {
        this.getEmployees();
      }, error => console.error(error))
    }
  }  
}
