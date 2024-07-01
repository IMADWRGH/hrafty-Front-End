import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HraftyServiceComponent } from './hrafty-service.component';

describe('HraftyServiceComponent', () => {
  let component: HraftyServiceComponent;
  let fixture: ComponentFixture<HraftyServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HraftyServiceComponent]
    });
    fixture = TestBed.createComponent(HraftyServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
