import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  category: string;
  sortingExpanded: boolean;
  filtersExpanded: boolean;

  constructor() { }

}
