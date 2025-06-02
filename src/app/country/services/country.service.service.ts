import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Country } from '../interfaces/country';
import { catchError, combineLatest, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryServiceService {
  http = inject(HttpClient);
  private readonly baseURL = 'https://restcountries.com/v3.1';

  private readonly _regions: string[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
  ];

  get regions(): string[] {
    return [...this._regions];
  }

  getCountriesByRegion(region: string): Observable<Country[]> {
    if (!region) return of([]);
    const url = `${this.baseURL}/region/${region}?fields=name,cca3,borders`;
    return this.http.get<Country[]>(url).pipe(catchError(() => of([])));
  }

  getCountryByCode(code: string): Observable<Country | null> {
    if (!code) return of(null);
    const url = `${this.baseURL}/alpha/${code}?fields=cca3,name,borders`;
    return this.http.get<Country>(url);
  }

  getCountryBordersByCodes(countriesCodes: string[]): Observable<Country[]> {
    if (!countriesCodes) return of([]);
    const countriesRequest: Observable<Country>[] = [];
    countriesCodes.forEach((code) => {
      const request = this.getCountryByCode(code).pipe(
        map((country) => {
          if (!country) throw new Error('Country not found');
          return country;
        })
      );
      countriesRequest.push(request);
    });
    return combineLatest(countriesRequest).pipe(catchError(() => of([])));
  }
}
