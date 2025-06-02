import {
  AbstractControl,
  FormArray,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

async function sleep(seconds: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
}
export class FormUtils {
  static readonly namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static readonly emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static readonly notOnlySpacesPattern = '^[a-zA-Z0-9]+$';
  static readonly passwordPattern =
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$';
  static isValidField(field: string, formGroup: FormGroup): boolean | null {
    return (
      formGroup.controls[field].errors && formGroup.controls[field].touched
    );
  }
  static getFieldError(
    field: string,
    formGroup: FormGroup,
    errorMessage: string | undefined
  ): string | null {
    if (!formGroup.controls[field]) return null;
    const errors = formGroup.controls[field].errors || {};

    return this.getErrorByKeys(errors, errorMessage);
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
    return this.getErrorByKeys(errors, undefined);
  }

  private static getErrorByKeys(
    errors: any,
    errorMessage: string | undefined
  ): string | null {
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
        case 'notEqual':
          return 'Los campos no coinciden';
        case 'emailTaken':
          return 'El correo electrónico ya está en uso';
        case 'usernameTaken':
          return 'El nombre de usuario ya está en uso';
        default:
          return errorMessage ?? null;
      }
    }
    return null;
  }
  static isFieldOneEqualFieldTwo(field1: string, field2: string) {
    return (formGroup: AbstractControl) => {
      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;
      return fieldValue1 === fieldValue2 ? null : { notEqual: true };
    };
  }
  static async checkingServerResponse(
    control: AbstractControl
  ): Promise<ValidationErrors | null> {
    await sleep(1);
    const formValue = control.value;
    if (formValue === 'hola@gmail.com') {
      return {
        emailTaken: true,
      };
    }
    return null;
  }
  static checkingUsernameServerResponse(
    control: AbstractControl
  ): ValidationErrors | null {
    const formValue = control.value;
    if (formValue === 'Jorel254') {
      return {
        usernameTaken: true,
      };
    }
    return null;
  }
}
