import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';
import { MovieService } from '../shared/movie.service';
import {Dates} from '../models/dates';
import {UrlConst} from '../models/url.constants';
import {FilterService} from '../shared/filter.service';
import {Category} from '../models/category';

@Component({
  selector: 'app-movie-browser',
  templateUrl: './movie-browser.component.html',
  styleUrls: ['./movie-browser.component.css']
})
export class MovieBrowserComponent implements OnInit {

  selectedCategory: string = UrlConst.POPULARITY_DESC;
  fromDate: string;
  toDate: string;
  voteCount: number;
  selectedButton: string;
  movies$: Observable<Movie[]>;
  nowPlayingDates: Dates;
  upcomingDates: Dates;
  releaseType: string;
  sortExpanded: boolean;
  filterExpanded: boolean;
  eCategory = Category;

  constructor(public movieService: MovieService, private filterService: FilterService) {
    this.releaseType = this.movieService.urlParams.withReleaseType;
    this.fromDate = this.movieService.urlParams.releaseDateGte;
    this.toDate = this.movieService.urlParams.releaseDateLte;
    this.voteCount = this.movieService.urlParams.voteCountGte;
    this.selectedCategory = this.movieService.urlParams.sortCategory;
    this.sortExpanded = this.filterService.sortingExpanded ? this.filterService.sortingExpanded : false;
    this.filterExpanded = this.filterService.filtersExpanded ? this.filterService.filtersExpanded : false;
    this.selectedButton = this.filterService.category ? this.filterService.category : Category.Popular;
  }

  ngOnInit(): void {
    this.movies$ = this.movieService.getMovies$();
    this.movieService.getNowPlayingDates$().subscribe(data => this.nowPlayingDates = data);
    this.movieService.getUpcomingDates$().subscribe(data => this.upcomingDates = data);
    this.movieService.getMovies(UrlConst.DISCOVER);
  }

  onButtonClicked(category: string): void {
    if (this.selectedButton !== category) {
      this.movieService.resetUrlParams();
    }
    if (category === this.eCategory.Popular && this.selectedButton !== category) {
      this.movieService.getMovies(UrlConst.DISCOVER);
      console.log('inside get popular movies');
      console.log(this.movieService.urlParams);
    } else if (category === this.eCategory.TopRated && this.selectedButton !== category) {
      this.movieService.getTopRatedMovies();
    } else if (category === this.eCategory.NowPlaying && this.selectedButton !== category) {
      this.movieService.getNowPlayingMovies(this.nowPlayingDates.minimum, this.nowPlayingDates.maximum);
    } else if (category === this.eCategory.Upcoming && this.selectedButton !== category) {
      this.movieService.getUpcomingMovies(this.upcomingDates.minimum, this.upcomingDates.maximum);
    }
    this.selectedButton = category;
    this.filterService.category = category;
    this.selectedCategory = this.movieService.urlParams.sortCategory;
    this.fromDate = this.movieService.urlParams.releaseDateGte;
    this.toDate = this.movieService.urlParams.releaseDateLte;
    this.voteCount = this.movieService.urlParams.voteCountGte;
  }
}
