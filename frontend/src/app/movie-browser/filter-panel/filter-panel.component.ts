import { Component, Input, OnInit, OnChanges, DoCheck } from '@angular/core';
import { Observable } from 'rxjs';
import { Genre } from 'src/app/models/genre';
import { MovieService } from 'src/app/services/movie.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.css']
})
export class FilterPanelComponent implements OnInit {

  @Input()
  sortCategory: string;
  selectedGenre: string;
  genres: string[] = [];
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

    // this.fromDate = new FormControl(this.movieService.urlParams.releaseDateGte);
    // this.toDate = new FormControl(this.movieService.urlParams.releaseDateLte);
    // this.voteCount = this.movieService.urlParams.voteCountGte;
    // this.sortCategory = this.movieService.urlParams.sortCategory;
    console.log('inside ngOnInit in filter-panel-component');
    console.log(this.sortExpanded);
    console.log(this.movieService.urlParams);
  }

  // ngDoCheck(): void {
  //     this.fromDate = new FormControl(this.movieService.urlParams.releaseDateGte);
  //     this.toDate = new FormControl(this.movieService.urlParams.releaseDateLte);
  //     this.voteCount = this.movieService.urlParams.voteCountGte;
  //     this.sortCategory = this.movieService.urlParams.sortCategory;
  //     console.log('inside do check');
  // }

  // ngOnChanges(): void {
  //   this.fromDate = new FormControl(this.movieService.urlParams.releaseDateGte);
  //   this.toDate = new FormControl(this.movieService.urlParams.releaseDateLte);
  //   this.voteCount = this.movieService.urlParams.voteCountGte;
  //   this.sortCategory = this.movieService.urlParams.sortCategory;
  //   console.log('inside on changes');
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
    console.log('in apply filters');
    console.log(this.fromDate);
    console.log(this.toDate);
    console.log(this.datePipe.transform(this.fromDate, 'yyyy-MM-dd'));
    console.log(this.datePipe.transform(this.toDate, 'yyyy-MM-dd'));
    console.log(this.voteCount);
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
