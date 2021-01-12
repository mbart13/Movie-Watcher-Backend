import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject  } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Genre } from '../models/genre';
import { Movie } from '../models/movie';
import { MovieCredits } from '../models/movie-credits';
import { MovieDetails } from '../models/movie-details';
import { UrlParams } from '../models/url-params';
import {Dates} from '../models/dates';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  urlParams: UrlParams = { pageNumber: 1, sortCategory: 'popularity.desc' };
  movies$: BehaviorSubject<Movie[]> = new BehaviorSubject([]);
  genresUrl = `${environment.tmdb_base_url}/genre/movie/list?api_key=${environment.api_key}`;
  nowPlayingMoviesUrl = `${environment.tmdb_base_url}/movie/now_playing?api_key=${environment.api_key}&page=1`;
  upcomingMoviesUrl = `${environment.tmdb_base_url}/movie/upcoming?api_key=${environment.api_key}&page=1`;
  movieDetailsUrl = `${environment.tmdb_base_url}/movie`;

  constructor(private http: HttpClient) { }

  resetUrlParams(): void {
    this.urlParams = {
      pageNumber: 1,
      sortCategory: 'popularity.desc',
      withGenres: '',
      voteCountGte: 0,
      releaseDateGte: '',
      releaseDateLte: '',
      withReleaseType: ''
    };
  }

  getMovies(queryType: string): void {
    this.http.get<any>(`${environment.tmdb_base_url}/${queryType}/movie?sort_by=${this.urlParams.sortCategory}&primary_release_date.gte=${
      this.urlParams.releaseDateGte}&primary_release_date.lte=${this.urlParams.releaseDateLte}&with_release_type=${this.urlParams.withReleaseType}&with_genres=${
      this.urlParams.withGenres}&vote_count.gte=${this.urlParams.voteCountGte}&api_key=${environment.api_key}&page=${this.urlParams.pageNumber}`)
        .pipe(
          tap(data => this.movies$.next(data.results))
        ).subscribe();
  }

  getMovies$(): Observable<Movie[]> {
    return this.movies$.asObservable();
  }

  getNowPlayingDates(): Observable<Dates> {
    return this.http.get<any>(this.nowPlayingMoviesUrl)
      .pipe(
        map(response => response.dates)
      );
  }

  getUpcomingDates(): Observable<Dates> {
    return this.http.get<any>(this.upcomingMoviesUrl)
      .pipe(
        map(response => response.dates)
      );
  }

  getGenres(): Observable<Genre[]> {
    return this.http.get<any>(this.genresUrl)
      .pipe(
        map(result => result.genres)
      );
  }

  getMovieDetails(id: number): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(`${this.movieDetailsUrl}/${id}?api_key=${environment.api_key}`);
  }

  getMovieCredits(id: number): Observable<MovieCredits> {
    return this.http.get<MovieCredits>(`${this.movieDetailsUrl}/${id}/credits?api_key=${environment.api_key}`);
  }
}
