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
  sortCategory = 'popularity.desc';
  selectedGenre: string;
  @Input()
  genresIds: string[];
  genres$: Observable<Genre[]>;
  sortExpanded = false;
  filterExpanded = false;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.genres$ = this.movieService.getGenres();
  }

  toggleSort(): void {
    this.sortExpanded = !this.sortExpanded;
  }

  toggleFilters(): void {
    this.filterExpanded = !this.filterExpanded;
  }

  onButtonClicked(genreId: string): void {
    if (this.genresIds.includes(genreId)) {
      this.genresIds = this.genresIds.filter(id => genreId !== id);
    } else {
      this.genresIds.push(genreId);
    }
  }

  applyFilters(): void {
    this.movieService.urlParams.sortCategory = this.sortCategory;
    this.movieService.urlParams.withGenres = this.genresIds.join(',');
    this.movieService.getMovies('discover');
  }

}
