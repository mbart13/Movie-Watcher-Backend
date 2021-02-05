import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import { Genre } from 'src/app/models/genre';
import { MovieService } from 'src/app/services/movie.service';
import { DatePipe } from '@angular/common';
import {FiltersStateService} from '../../services/filters-state.service';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.css']
})
export class FilterPanelComponent implements OnInit   {

  MINIMUM_VOTES = 0;
  MAXIMUM_VOTES = 10000;
  STEP = 1000;
  @Input()
  sortCategory: string;
  @Input()
  selectedButton: string;
  genres: string[];
  genres$: Observable<Genre[]>;
  @Input()
  sortExpanded;
  @Input()
  filterExpanded;
  @Input()
  fromDate: string;
  @Input()
  toDate: string;
  @Input()
  voteCount: number;

  constructor(private movieService: MovieService,
              private datePipe: DatePipe,
              public filterService: FiltersStateService) { }

  ngOnInit(): void {
    this.genres$ = this.movieService.getGenres$();
    if (this.movieService.urlParams.withGenres !== '') {
      this.genres = this.movieService.urlParams.withGenres.split(',');
    } else {
      this.genres = [];
    }
  }

  toggleSort(): void {
    this.sortExpanded = !this.sortExpanded;
    this.filterService.sortingExpanded = this.sortExpanded;
  }

  toggleFilters(): void {
    this.filterExpanded = !this.filterExpanded;
    this.filterService.filtersExpanded = this.filterExpanded;
  }

  onButtonClicked(genreId: string, event): void {
    if (this.genres.includes(genreId)) {
      this.genres = this.genres.filter(id => genreId !== id);
    } else {
      this.genres.push(genreId);
    }
    if (event.target.classList.contains('btn-selected')) {
      event.target.classList.add('no-hover');
    } else {
      event.target.classList.remove('no-hover');
    }
  }

  onMouseOut(event): void {
    event.target.classList.remove('no-hover');
  }

  reset(): void {
    if (this.selectedButton === 'popular') {
      // this.movieService.resetUrlParams();
      this.voteCount = 0;
      this.genres = [];
    } else if (this.selectedButton === 'now playing') {
      console.log();
    }

    this.movieService.urlParams.withGenres = '';
    console.log(this.movieService.urlParams);
    console.log(this.selectedButton);
    console.log(this.voteCount);
  }

  applyFilters(): void {
    this.movieService.movies$.next([]);
    this.movieService.resetUrlParams();
    this.movieService.urlParams.sortCategory = this.sortCategory;
    this.movieService.urlParams.withGenres = this.genres.join(',');
    this.movieService.urlParams.releaseDateGte = this.fromDate === '' || this.fromDate === null
      ? '' : this.datePipe.transform(this.fromDate, 'yyyy-MM-dd');
    this.movieService.urlParams.releaseDateLte = this.toDate === '' || this.fromDate === null
      ? '' : this.datePipe.transform(this.toDate, 'yyyy-MM-dd');
    this.movieService.urlParams.voteCountGte = this.voteCount;
    this.movieService.getMovies();
    console.log(this.movieService.urlParams);
  }

}
