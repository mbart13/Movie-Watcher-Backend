import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';
import { MovieService } from '../services/movie.service';
import {Dates} from '../models/dates';

@Component({
  selector: 'app-movie-browser',
  templateUrl: './movie-browser.component.html',
  styleUrls: ['./movie-browser.component.css']
})
export class MovieBrowserComponent implements OnInit {

  selectedCategory: string;
  selectedGenres: string[] = [];
  selectedButton = 'popular';
  movies$: Observable<Movie[]>;
  nowPlayingDates: Dates;
  upcomingDates: Dates;

  constructor(public movieService: MovieService) { }

  ngOnInit(): void {
    console.log(this.movieService.urlParams);
    this.selectedCategory = this.movieService.urlParams.sortCategory;
    this.movies$ = this.movieService.getMovies$();
    this.movieService.getNowPlayingDates$()
      .subscribe(data => this.nowPlayingDates = data);
    this.movieService.getUpcomingDates$()
      .subscribe(data => this.upcomingDates = data);
    this.movieService.getMovies('discover');
  }

  onButtonClicked(category: string): void {
    if (category === 'popular' && this.selectedButton !== category) {
      this.getPopularMovies();
    } else if (category === 'top rated' && this.selectedButton !== category) {
      this.getTopRatedMovies();
    } else if (category === 'now playing' && this.selectedButton !== category) {
      this.getNowPlayingMovies();
    } else if (category === 'upcoming' && this.selectedButton !== category) {
      this.getUpcomingMovies();
    }
    this.selectedButton = category;
    this.selectedCategory = this.movieService.urlParams.sortCategory;
    this.selectedGenres = [];
  }

  getPopularMovies(): void  {
    this.movieService.resetUrlParams();
    this.movieService.getMovies('discover');
  }

  getTopRatedMovies(): void  {
    this.movieService.resetUrlParams();
    this.movieService.urlParams.sortCategory = 'vote_average.desc';
    this.movieService.urlParams.voteCountGte = 3000;
    this.movieService.getMovies('discover');
    this.selectedCategory = this.movieService.urlParams.sortCategory;
  }

  getNowPlayingMovies(): void  {
    this.movieService.resetUrlParams();
    this.movieService.urlParams.releaseDateGte = this.nowPlayingDates.minimum;
    this.movieService.urlParams.releaseDateLte = this.nowPlayingDates.maximum;
    this.movieService.urlParams.withReleaseType = '3|2';
    this.movieService.getMovies('discover');
  }

  getUpcomingMovies(): void {
    this.movieService.resetUrlParams();
    this.movieService.urlParams.releaseDateGte = this.upcomingDates.minimum;
    this.movieService.urlParams.releaseDateLte = this.upcomingDates.maximum;
    this.movieService.urlParams.withReleaseType = '3|2';
    this.movieService.getMovies('discover');
  }
}
