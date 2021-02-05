import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FiltersStateService {

  category: string;
  sortingExpanded: boolean;
  filtersExpanded: boolean;

  constructor() { }

}
