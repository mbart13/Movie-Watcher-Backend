import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { MovieDetails } from '../models/movie-details';
import { environment } from 'src/environments/environment';
import { MovieCredits } from '../models/movie-credits';
import { Observable } from 'rxjs';
import { Person } from '../models/person';
import { mergeMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  data: Observable<{ movieDetails: MovieDetails, movieCredits: MovieCredits }>;
  env: string = environment.tmdb_imagesUrl_w300;

  constructor(private movieService: MovieService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getMovieDetails();
  }

  getMovieDetails(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.data = this.movieService.getMovieDetails$(id).pipe(
      mergeMap(movieDetails => this.movieService.getMovieCredits$(id).pipe(
        map(movieCredits => ({
          movieDetails,
          movieCredits
        }))
      ))
    );
  }

  findCrewMembers(crew: Person[], role: string): Person[] {
    return crew.filter(crewMember => crewMember.job.toLowerCase() === role);
  }

}
