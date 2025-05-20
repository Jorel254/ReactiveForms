import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrrorValidatorComponent } from './error-validator.component';

describe('ErrrorValidatorComponent', () => {
  let component: ErrrorValidatorComponent;
  let fixture: ComponentFixture<ErrrorValidatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrrorValidatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrrorValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
