import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.css']
})
export class FilterPanelComponent implements OnInit {

  sortingExpanded: boolean = false;
  filterExpanded: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleSortingOptions() {
    this.sortingExpanded = !this.sortingExpanded;    
  }

  toggleFilterOptions() {
    this.filterExpanded = !this.filterExpanded;    
  }

}
