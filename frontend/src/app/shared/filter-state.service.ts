import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterStateService {

  category: string;
  sortingExpanded: boolean;
  filtersExpanded: boolean;

  constructor() { }

}
