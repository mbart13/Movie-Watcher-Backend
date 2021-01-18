import { Component, Input, OnInit } from '@angular/core';
import { Genre } from 'src/app/models/genre';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/shared/movie.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  @Input()
  movies: Movie[];
  genres$: Observable<Genre[]>;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.genres$ = this.movieService.getGenres$();
  }

  loadMore(): void {
    this.movieService.urlParams.pageNumber++;

  }

}
