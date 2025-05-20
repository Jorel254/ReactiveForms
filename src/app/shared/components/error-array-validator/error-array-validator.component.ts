import { Component, input } from '@angular/core';
import { FormArray } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-error-array-validator',
  imports: [],
  templateUrl: './error-array-validator.component.html',
  styleUrl: './error-array-validator.component.css'
})
export class ErrorArrayValidatorComponent {
  fieldArray = input.required<FormArray>();
  index = input.required<number>();

  formUtils = FormUtils;
}
