import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Genre } from 'src/app/genre';
import { GenreService } from 'src/app/genre.service';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.css']
})
export class FilterPanelComponent implements OnInit {

  genres$: Observable<Genre[]>;
  sortingExpanded: boolean = false;
  filterExpanded: boolean = false;

  constructor(private genreService: GenreService) { }

  ngOnInit(): void {
    this.genres$ = this.genreService.getGenres();
  }

  toggleSortingOptions() {
    this.sortingExpanded = !this.sortingExpanded;    
  }

  toggleFilterOptions() {
    this.filterExpanded = !this.filterExpanded;    
  }

}
