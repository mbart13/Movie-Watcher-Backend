import { Component, Input, OnInit } from '@angular/core';
import { Genre } from 'src/app/models/genre';
import { GenreService } from 'src/app/services/genre.service';
import { Movie } from 'src/app/models/movie';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {

  env = environment.tmdb_images_w300;

  @Input()
  genres: Genre[];

  @Input()
  movie: Movie;

  constructor() { }

  ngOnInit(): void {

  }

  mapIdToGenre(id: number) {
    return this.genres.find(genre => genre.id === id).name;
  }

}
