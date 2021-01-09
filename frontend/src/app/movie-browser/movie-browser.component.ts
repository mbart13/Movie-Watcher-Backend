import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-browser',
  templateUrl: './movie-browser.component.html',
  styleUrls: ['./movie-browser.component.css']
})
export class MovieBrowserComponent implements OnInit {

  selectedButton: string = 'popular';
  movies$: Observable<Movie[]>

  constructor(public movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.resetUrlParams()
    this.movieService.urlParams.sortCategory = 'popularity.desc'    
    this.movieService.getMovies()
    this.movies$ = this.movieService.getMovies$()
  }

  onButtonClicked(category: string) {
    this.movieService.resetUrlParams();
    if (category === 'popular' && this.selectedButton !== category) {
      this.getPopularMovies();
    } else if (category === 'top rated' && this.selectedButton !== category) {
      this.getTopRatedMovies();
    } else if (category === 'now playing' && this.selectedButton !== category) {
      this.getNowPlayingMovies();
    } else if (category === 'upcoming' && this.selectedButton !== category) {
      this.getUpcomingMovies();
    }
  }

  getPopularMovies() {
    this.movieService.urlParams.sortCategory = 'popularity.desc';
    this.selectedButton = 'popular';
    this.movieService.getMovies();
  }

  getTopRatedMovies() {
    this.movieService.urlParams.sortCategory = 'vote_average.desc';
    this.movieService.urlParams.voteCountGte = '3000';
    this.selectedButton = 'top rated';
    this.movieService.getMovies();
  }

  getNowPlayingMovies() {
    //todo
    this.selectedButton = 'now playing';
  }

  getUpcomingMovies() {
    //todo
    this.selectedButton = 'upcoming';
  }
}
