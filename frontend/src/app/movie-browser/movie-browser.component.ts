import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-browser',
  templateUrl: './movie-browser.component.html',
  styleUrls: ['./movie-browser.component.css']
})
export class MovieBrowserComponent implements OnInit {

  selectedButton: string = 'popular';

  constructor(public movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.resetUrlParams()
    this.movieService.urlParams.sortCategory = 'popularity.desc'
    this.movieService.movies$ = this.movieService.getMovies()
  }

  onButtonClicked(category: string) {
    this.movieService.resetUrlParams();
    if (category === 'popular' && this.selectedButton !== category) {
      this.getPopularMovies();
    } else if (category === 'top rated' && this.selectedButton !== category) {
      this.getTopRatedMovies();
    } else if (category === 'now playing' && this.selectedButton !== category) {
        this.selectedButton = 'now playing';
    } else if (category === 'upcoming' && this.selectedButton !== category) {
        this.selectedButton = 'upcoming';
    }
  }

  getPopularMovies() {
    this.movieService.urlParams.sortCategory = 'popularity.desc';
    this.selectedButton = 'popular';
    this.movieService.movies$ = this.movieService.getMovies();
  }

  getTopRatedMovies() {
    this.movieService.urlParams.sortCategory = 'vote_average.desc';
    this.movieService.urlParams.voteCountGte = '3000';
    this.selectedButton = 'top rated';
    this.movieService.movies$ = this.movieService.getMovies();
  }
}
