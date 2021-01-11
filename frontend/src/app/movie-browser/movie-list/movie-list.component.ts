import { Component, Input, OnInit } from '@angular/core';
import { Genre } from 'src/app/models/genre';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  @Input()
  movies: Movie[];
  // @Input()
  // filterHidden;
  genres: Genre[];

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getGenres()
      .subscribe(data => this.genres = data);
  }

  loadMore(): void {
    this.movieService.urlParams.pageNumber++;

  }

}
