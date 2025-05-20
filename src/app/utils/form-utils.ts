import { FormArray, FormGroup } from '@angular/forms';

export class FormUtils {
  static isValidField(field: string, formGroup: FormGroup): boolean | null {
    return (
      formGroup.controls[field].errors && formGroup.controls[field].touched
    );
  }
  static getFieldError(field: string, formGroup: FormGroup): string | null {
    if (!formGroup.controls[field]) return null;
    const errors = formGroup.controls[field].errors || {};

    return this.getErrorByKeys(errors);
  }
  static isValidFieldArray(
    formArray: FormArray,
    index: number
  ): boolean | null {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  static getArrayError(formArray: FormArray, index: number): string | null {
    if (!formArray.controls[index]) return null;
    const errors = formArray.controls[index].errors || {};
    return this.getErrorByKeys(errors);
  }

  private static getErrorByKeys(errors: any): string | null {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `El campo debe tener al menos  un tamaño de ${errors['minlength'].requiredLength}`;
        case 'min':
          return `El campo debe tener un valor minimo de ${errors['min'].min}`;
        case 'nullValidator':
          return 'Este campo no puede estar vacio';
        default:
          return null;
      }
    }
    return null;
  }
}
