import { Directive } from '@angular/core';
import { DataBindingDirective, GridComponent } from '@progress/kendo-angular-grid';
import { EmployeeService } from '../../employee/employee.service';
import { Subscription } from 'rxjs/Subscription';
import { OnInit, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { sample } from 'rxjs/operator/sample';
@Directive({
  selector: '[appEmployeeBindingDirective]'
})
export class EmployeeBindingDirectiveDirective extends DataBindingDirective implements OnInit, OnDestroy {
  private serviceSubscription: Subscription;
  constructor(private employeeService: EmployeeService, grid: GridComponent) {
    super(grid);
  }

  public ngOnInit(): void {
    this.serviceSubscription = this.employeeService.getEmployees().subscribe(data => {
      this.grid.data = data;
      this.notifyDataChange();
    });
    super.ngOnInit();
    this.rebind();
  }

  public ngOnDestroy(): void {
    if (this.serviceSubscription) {
      this.serviceSubscription.unsubscribe();
    }
    super.ngOnDestroy();
  }

  public rebind(): void {
   // this.employeeService.getEmployees().qu
  }

}
