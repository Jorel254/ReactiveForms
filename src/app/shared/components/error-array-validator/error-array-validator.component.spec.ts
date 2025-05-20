import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorArrayValidatorComponent } from './error-array-validator.component';

describe('ErrorArrayValidatorComponent', () => {
  let component: ErrorArrayValidatorComponent;
  let fixture: ComponentFixture<ErrorArrayValidatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorArrayValidatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorArrayValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
