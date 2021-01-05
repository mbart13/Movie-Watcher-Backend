import { Component, OnInit } from '@angular/core';
import { Genre } from 'src/app/genre';
import { GenreService } from 'src/app/genre.service';
import { MOVIES } from 'src/app/mock-movies';
import { Movie } from 'src/app/movie';
import { MovieService } from 'src/app/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movies: Movie[] = MOVIES;
  genres: Genre[] = [];

  constructor(private movieService: MovieService, private genreService: GenreService) { }

  ngOnInit(): void {
    this.genreService.getGenres()
      .subscribe(data => this.genres = data)

    
  }

}
