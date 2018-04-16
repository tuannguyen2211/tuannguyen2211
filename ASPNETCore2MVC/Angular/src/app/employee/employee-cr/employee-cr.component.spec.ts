import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCrComponent } from './employee-cr.component';

describe('EmployeeCrComponent', () => {
  let component: EmployeeCrComponent;
  let fixture: ComponentFixture<EmployeeCrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeCrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeCrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
