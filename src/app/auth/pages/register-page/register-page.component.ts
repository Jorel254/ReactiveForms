import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ErrrorValidatorComponent } from '../../../shared/components/error-validator/error-validator.component';
import { FormUtils } from '../../../utils/form-utils';
@Component({
  selector: 'app-register-page',
  imports: [CommonModule, ReactiveFormsModule, ErrrorValidatorComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
  fb = inject(FormBuilder);

  myForm = this.fb.group(
    {
      name: [
        null,
        [
          Validators.required,
          Validators.pattern(new RegExp(FormUtils.namePattern)),
        ],
      ],
      email: [
        null,
        [
          Validators.required,
          Validators.pattern(new RegExp(FormUtils.emailPattern)),
        ],
        [FormUtils.checkingServerResponse],
      ],
      username: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(new RegExp(FormUtils.notOnlySpacesPattern)),
          FormUtils.checkingUsernameServerResponse
        ],
      ],

      password: [
        null,
        [
          Validators.required,
          Validators.pattern(new RegExp(FormUtils.passwordPattern)),
        ],
      ],
      password2: [null, [Validators.required]],
    },
    { validators: [FormUtils.isFieldOneEqualFieldTwo('password', 'password2')] }
  );

  onSubmit() {
    this.myForm.markAllAsTouched();
  }
}
