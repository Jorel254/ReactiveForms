import { Component, input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';
@Component({
  selector: 'app-error-validator',
  imports: [],
  templateUrl: './error-validator.component.html',
  styleUrl: './error-validator.component.css',
})
export class ErrrorValidatorComponent {
  fieldInput = input.required<string>();
  controlGroup = input.required<FormGroup>();
  errorMessage = input<string>();

  formUtils = FormUtils;
}
