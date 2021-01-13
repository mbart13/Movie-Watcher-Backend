import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Genre } from 'src/app/models/genre';
import { MovieService } from 'src/app/services/movie.service';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.css']
})
export class FilterPanelComponent implements OnInit, OnChanges {

  sortCategory = 'popularity.desc';
  selectedGenre: string;
  @Input()
  genresIds: string[];
  voteCount: number;
  genres$: Observable<Genre[]>;
  sortExpanded = false;
  filterExpanded = false;
  fromDate = new FormControl();
  toDate = new FormControl();

  constructor(private movieService: MovieService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.genres$ = this.movieService.getGenres$();
  }

  ngOnChanges(): void {
    this.fromDate = new FormControl(this.movieService.urlParams.releaseDateGte);
    this.toDate = new FormControl(this.movieService.urlParams.releaseDateLte);
    this.voteCount = this.movieService.urlParams.voteCountGte;
    this.sortCategory = this.movieService.urlParams.sortCategory;
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
    this.movieService.urlParams.releaseDateGte = this.fromDate.value === '' ? '' :
        this.datePipe.transform(this.fromDate.value, 'yyyy-MM-dd');
    this.movieService.urlParams.releaseDateLte = this.toDate.value === '' ? '' :
        this.datePipe.transform(this.toDate.value, 'yyyy-MM-dd');
    this.movieService.urlParams.voteCountGte = this.voteCount;
    this.movieService.getMovies('discover');
  }

}
