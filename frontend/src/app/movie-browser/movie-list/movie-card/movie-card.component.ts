import { Component, Input, OnInit } from '@angular/core';
import { Genre } from 'src/app/genre';
import { GenreService } from 'src/app/genre.service';
import { Movie } from 'src/app/movie';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {

  @Input()
  genres: Genre[];

  @Input()
  movie: Movie;

  constructor() { }

  ngOnInit(): void {
    console.log(this.genres);
    
  }



}
