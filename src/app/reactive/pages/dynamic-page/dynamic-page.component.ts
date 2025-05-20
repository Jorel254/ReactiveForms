import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ErrrorValidatorComponent } from '../../../shared/components/error-validator/error-validator.component';
import { ErrorArrayValidatorComponent } from '../../../shared/components/error-array-validator/error-array-validator.component';
@Component({
  selector: 'app-dynamic-page',
  imports: [CommonModule, ReactiveFormsModule, ErrrorValidatorComponent, ErrorArrayValidatorComponent],
  templateUrl: './dynamic-page.component.html',
  styleUrl: './dynamic-page.component.css',
})
export class DynamicPageComponent {
  fb = inject(FormBuilder);

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array(
      [
        ['Metal Gear', Validators.required],
        ['Death Stranding', Validators.required],
      ],
      [Validators.minLength(3)]
    ),
  });

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  onDeleteGame(index: number) {
    this.favoriteGames.removeAt(index);
  }
}
