import {Component, Input, OnChanges, OnInit} from '@angular/core';
import { Genre } from 'src/app/models/genre';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/shared/movie.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit, OnChanges {

  @Input()
  movies: Movie[];
  genres$: Observable<Genre[]>;
  // previousLength: number;
  noMoreMovies: boolean;

  constructor(private movieService: MovieService) { }

  ngOnChanges(): void {

    // console.log(this.previousLength);
  }

  ngOnInit(): void {
    this.genres$ = this.movieService.getGenres$();
  }

  loadMore(): void {
    // if (this.previousLength === this.movieService.movies$.value.length) {
    //   this.noMoreMovies = true;
    // }
    // console.log(this.movieService.movies$.value.length);
    this.movieService.urlParams.pageNumber++;
    this.movieService.getMovies();
    // this.previousLength = this.movies.length;
    // console.log(this.previousLength);
  }

}
