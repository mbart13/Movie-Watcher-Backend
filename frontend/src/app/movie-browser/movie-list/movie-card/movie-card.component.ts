import { Component, Input, OnInit } from '@angular/core';
import { Genre } from 'src/app/models/genre';
import { Movie } from 'src/app/models/movie';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {

  env: string = environment.tmdb_imagesUrl_w300;

  @Input()
  genres: Genre[];

  @Input()
  movie: Movie;

  constructor() { }

  ngOnInit(): void {
  }

  getGenreById(id: string): string {
    if (this.genres) {
      return this.genres.find(genre => genre.id === id).name;
    }
  }

}
