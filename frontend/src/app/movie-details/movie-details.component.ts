import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { MovieDetails } from '../models/movie-details';
import { environment } from 'src/environments/environment';
import { MovieCredits } from '../models/movie-credits';
import { Observable } from 'rxjs';
import { Person } from '../models/person';
import { Genre } from '../models/genre';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movieDetails$: Observable<MovieDetails>;
  movieCredits$: Observable<MovieCredits>;
  genres$: Observable<Genre[]>;
  env = environment.tmdb_imagesUrl_w300;

  constructor(private movieService: MovieService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getMovieDetails()
  }

  getGenres() {
    this.genres$ = this.movieService.getGenres();
  }

  getMovieDetails(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.movieDetails$ = this.movieService.getMovieDetails(id);
    this.movieCredits$ = this.movieService.getMovieCredits(id);
  }

  findCrewMember(crew: Person[], role: string) {
    return crew.filter(crewMember => crewMember.job.toLowerCase() === role);
  }

}
