import { Component, effect, inject, signal } from '@angular/core';
import { CountryServiceService } from '../../services/country.service.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { Country } from '../../interfaces/country';
import { switchMap, tap, filter } from 'rxjs';
@Component({
  selector: 'app-country-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.css',
})
export class CountryPageComponent {
  fb = inject(FormBuilder);
  countryService = inject(CountryServiceService);
  regions = signal(this.countryService.regions);
  countriesByRegion = signal<Country[]>([]);
  countriesByBorder = signal<Country[]>([]);

  countryForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  });

  onFormChange = effect((onCleanup) => {
    const formRegionChanged = this.onRegionChange();
    const formCountryChanged = this.onCountryChange();
    onCleanup(() => {
      formRegionChanged?.unsubscribe();
      formCountryChanged?.unsubscribe();
    });
  });

  onRegionChange = () => {
    return this.countryForm
      .get('region')
      ?.valueChanges.pipe(
        tap(() => {
          this.countryForm.get('country')?.reset();
          this.countryForm.get('border')?.reset();
          this.countriesByRegion.set([]);
          this.countriesByBorder.set([]);
        }),
        switchMap((region) => this.countryService.getCountriesByRegion(region)) //Subscripcion a la llamada http con el switchMap
      )
      .subscribe((countries) => {
        this.countriesByRegion.set(countries);
      });
  };

  onCountryChange = () => {
    return this.countryForm
      .get('country')
      ?.valueChanges.pipe(
        tap(() => this.countryForm.get('border')?.reset()),
        tap(() => this.countriesByBorder.set([])),
        filter((value) => value !== null && value !== undefined),
        switchMap((countryCode) =>
          this.countryService.getCountryByCode(countryCode)
        ),
        switchMap((country) =>
          this.countryService.getCountryBordersByCodes(country?.borders ?? [])
        )
      )
      .subscribe((country) => {
        this.countriesByBorder.set(country);
      });
  };
}
