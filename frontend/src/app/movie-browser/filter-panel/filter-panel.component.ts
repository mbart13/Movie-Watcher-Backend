import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Genre } from 'src/app/models/genre';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.css']
})
export class FilterPanelComponent implements OnInit {

  @Input()
  sortCategory: string;  
  selectedGenre: string;
  @Input()
  genresIds: string[];
  genres$: Observable<Genre[]>;
  sortExpanded: boolean = false;
  filterExpanded: boolean = false;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.genres$ = this.movieService.getGenres();
  }

  toggleSort() {
    this.sortExpanded = !this.sortExpanded;
  }

  toggleFilters() {
    this.filterExpanded = !this.filterExpanded;
  }

  onButtonClicked(genreId: string) {
    if (this.genresIds.includes(genreId)) {
      this.genresIds = this.genresIds.filter(id => genreId !== id)
    } else {
      this.genresIds.push(genreId);
    }
    
  }

  applyFilters() {
    this.movieService.urlParams.sortCategory = this.sortCategory;
    this.movieService.urlParams.withGenres = this.genresIds.join(',');
    this.movieService.getMovies()
    console.log(this.movieService.urlParams.withGenres);
    
  }

}
