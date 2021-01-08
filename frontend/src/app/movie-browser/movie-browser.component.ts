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
    this.movieService.reset()
    this.movieService.urlParams.sortCategory = 'popularity.desc'
    this.movieService.movies$ = this.movieService.getMovies()
  }

  selectButton(selectedButton) {
    switch (selectedButton) {
      case "popular":
        this.selectedButton = 'popular';
        break;
      case "now playing":
        this.selectedButton = 'now playing';
        break;
      case "top rated":
        this.selectedButton = 'top rated';
        break;
      case "upcoming":
        this.selectedButton = 'upcoming';
        break;
    }
  }

  getMovies(category: string) {
    if (category === 'popular' && this.selectedButton !== category) {
      this.movieService.reset()
      this.movieService.urlParams.sortCategory = 'popularity.desc'
      this.movieService.movies$ = this.movieService.getMovies()
    } else if (category === 'top rated' && this.selectedButton !== category) {
      this.movieService.reset()
      this.movieService.urlParams.sortCategory = 'vote_average.desc'
      this.movieService.urlParams.voteCountGte = '3000'
      this.movieService.movies$ = this.movieService.getMovies()
    }
  }
}
