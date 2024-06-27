import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { customerAuthGuardGuard } from './customer-auth-guard.guard';

describe('customerAuthGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => customerAuthGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
