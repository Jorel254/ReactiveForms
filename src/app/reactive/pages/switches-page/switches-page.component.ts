import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ErrrorValidatorComponent } from '../../../shared/components/error-validator/error-validator.component';
@Component({
  selector: 'app-switches-page',
  imports: [CommonModule, ReactiveFormsModule, ErrrorValidatorComponent],
  templateUrl: './switches-page.component.html',
  styleUrl: './switches-page.component.css',
})
export class SwitchesPageComponent {
  fb = inject(FormBuilder);
  myForm: FormGroup = this.fb.group({
    genero: [null, Validators.required],
    wantNotifications: [true],
    termsAndConditions: [false, Validators.requiredTrue],
  });

  onSubmit() {
    this.myForm.markAllAsTouched();
  }
}
