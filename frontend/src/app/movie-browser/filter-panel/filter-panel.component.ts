import {AfterContentInit, AfterViewInit, Component, Input, OnChanges, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { Genre } from 'src/app/models/genre';
import { MovieService } from 'src/app/services/movie.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.css']
})
export class FilterPanelComponent implements OnInit   {

  @Input()
  sortCategory: string;
  // @Input()
  genres: string[];
  genres$: Observable<Genre[]>;
  sortExpanded: boolean;
  filterExpanded: boolean;
  @Input()
  fromDate: string;
  @Input()
  toDate: string;
  @Input()
  voteCount: number;

  constructor(private movieService: MovieService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.genres$ = this.movieService.getGenres$();
    if (this.movieService.urlParams.withGenres !== '') {
      this.genres = this.movieService.urlParams.withGenres.split(',');
    } else {
      this.genres = [];
    }
  }

  // ngOnChanges(): void {
  //   this.voteCount = this.movieService.urlParams.voteCountGte;
  // }

  toggleSort(): void {
    this.sortExpanded = !this.sortExpanded;
  }

  toggleFilters(): void {
    this.filterExpanded = !this.filterExpanded;
  }

  onButtonClicked(genreId: string, event): void {
    if (this.genres.includes(genreId)) {
      this.genres = this.genres.filter(id => genreId !== id);
    } else {
      this.genres.push(genreId);
    }
    if (event.target.classList.contains('btn-active')) {
      event.target.classList.add('no-hover');
    } else {
      event.target.classList.remove('no-hover');
    }
  }

  onMouseOut(event): void {
    event.target.classList.remove('no-hover');
  }

  applyFilters(): void {
    this.movieService.urlParams.sortCategory = this.sortCategory;
    this.movieService.urlParams.withGenres = this.genres.join(',');
    this.movieService.urlParams.releaseDateGte = this.fromDate === '' ? '' :
        this.datePipe.transform(this.fromDate, 'yyyy-MM-dd');
    this.movieService.urlParams.releaseDateLte = this.toDate === '' ? '' :
        this.datePipe.transform(this.toDate, 'yyyy-MM-dd');
    this.movieService.urlParams.voteCountGte = this.voteCount;
    this.movieService.getMovies('discover');
    console.log(this.movieService.urlParams);
  }
}
