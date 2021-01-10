import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-browser',
  templateUrl: './movie-browser.component.html',
  styleUrls: ['./movie-browser.component.css']
})
export class MovieBrowserComponent implements OnInit {

  // selectedCategory: string;
  selectedGenres: string[] = [];
  selectedButton = 'popular';
  filterHidden = true;
  movies$: Observable<Movie[]>;

  constructor(public movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.resetUrlParams();
    // this.selectedCategory = this.movieService.urlParams.sortCategory;
    this.movieService.getMovies('discover');
    this.movies$ = this.movieService.getMovies$();
  }

  onButtonClicked(category: string): void {
    this.movieService.resetUrlParams();
    this.filterHidden = true;
    if (category === 'popular' && this.selectedButton !== category) {
      this.selectedButton = 'popular';
      this.getPopularMovies();
    } else if (category === 'top rated' && this.selectedButton !== category) {
      this.selectedButton = 'top rated';
      this.getTopRatedMovies();
    } else if (category === 'now playing' && this.selectedButton !== category) {
      this.selectedButton = 'now playing';
      this.getNowPlayingMovies();
    } else if (category === 'upcoming' && this.selectedButton !== category) {
      this.selectedButton = 'upcoming';
      this.getUpcomingMovies();
    } else if (category === 'custom' && this.selectedButton !== category) {
      this.selectedButton = 'custom';
      this.filterHidden = false;
      this.getPopularMovies();
    }
    // this.selectedCategory = this.movieService.urlParams.sortCategory;
    this.selectedGenres = [];

  }

  getPopularMovies(): void  {
    this.movieService.urlParams.sortCategory = 'popularity.desc';
    this.movieService.getMovies('discover');
  }

  getTopRatedMovies(): void  {
    this.movieService.urlParams.sortCategory = 'vote_average.desc';
    this.movieService.urlParams.voteCountGte = '3000';
    this.movieService.getMovies('discover');
  }

  getNowPlayingMovies(): void  {
    // todo
  }

  getUpcomingMovies(): void {
    // todo
    this.movieService.urlParams.releaseDateGte = '2021-01-13';
    this.movieService.urlParams.releaseDateLte = '2021-02-03';
    this.movieService.urlParams.withReleaseType = '3|2';
    this.movieService.getMovies('discover');
  }
}
