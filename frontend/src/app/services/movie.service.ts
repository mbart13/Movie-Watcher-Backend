import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Genre } from '../models/genre';
import { Movie } from '../models/movie';
import { MovieCredits } from '../models/movie-credits';
import { MovieDetails } from '../models/movie-details';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  genresUrl: string = `${environment.tmdb_base_url}/genre/movie/list?api_key=${environment.api_key}`
  moviesUrl: string = `${environment.tmdb_base_url}/discover/movie?sort_by=popularity.desc&api_key=${environment.api_key}`
  movieDetailsUrl: string = `${environment.tmdb_base_url}/movie`

  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    return this.http.get<any>(this.moviesUrl)
      .pipe(map(data => data.results));
  }

  getGenres(): Observable<Genre[]> {
    return this.http.get<any>(this.genresUrl)
      .pipe(map(result => result.genres));
  }

  getMovieDetails(id: number) {
    return this.http.get<MovieDetails>(`${this.movieDetailsUrl}/${id}?api_key=${environment.api_key}`)
  }

  getMovieCredits(id: number) {
    return this.http.get<MovieCredits>(`${this.movieDetailsUrl}/${id}/credits?api_key=${environment.api_key}`)
  }
}
