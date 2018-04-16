import { TestBed, async, inject } from '@angular/core/testing';

import { FormCheckGuard } from './form-check.guard';

describe('FormCheckGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormCheckGuard]
    });
  });

  it('should ...', inject([FormCheckGuard], (guard: FormCheckGuard) => {
    expect(guard).toBeTruthy();
  }));
});
