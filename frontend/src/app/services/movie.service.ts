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
import { Dates } from '../models/dates';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  urlParamsNames: string[] = [
    'sort_by', 'page', 'primary_release_date.gte', 'primary_release_date.lte', 'with_release_type', 'vote_count.gte', 'with_genres'
  ];

  urlParams: UrlParams = {
    sortCategory: 'popularity.desc',
    pageNumber: 1,
    releaseDateGte: '',
    releaseDateLte: '',
    withReleaseType: '',
    voteCountGte: 0,
    withGenres: ''
  };

  movies$: BehaviorSubject<Movie[]> = new BehaviorSubject([]);
  genresUrl = `${environment.tmdb_base_url}/genre/movie/list?api_key=${environment.api_key}`;
  nowPlayingMoviesUrl = `${environment.tmdb_base_url}/movie/now_playing?api_key=${environment.api_key}&page=1`;
  upcomingMoviesUrl = `${environment.tmdb_base_url}/movie/upcoming?api_key=${environment.api_key}&page=1`;
  movieDetailsUrl = `${environment.tmdb_base_url}/movie`;

  constructor(private http: HttpClient) { }

  getMovies(queryType: string): void {
      this.http.get<any>(`${environment.tmdb_base_url}/${queryType}/movie?${this.buildUrlParams()}`)
          .pipe(
            tap(data => this.movies$.next(data.results))
          ).subscribe();
  }

  getMovies$(): Observable<Movie[]> {
    return this.movies$.asObservable();
  }

  resetUrlParams(): void {
    this.urlParams.sortCategory = 'popularity.desc';
    this.urlParams.pageNumber = 1;
    this.urlParams.releaseDateGte = '';
    this.urlParams.releaseDateLte = '';
    this.urlParams.withReleaseType = '';
    this.urlParams.voteCountGte = 0;
    this.urlParams.withGenres =  '';
  }

  buildUrlParams(): string {
    let i = 0;
    let queryParams = '';

    for (const param of Object.keys(this.urlParams)) {
      if (this.urlParams[param] !== '') {
        queryParams += `${this.urlParamsNames[i]}=${this.urlParams[param]}&`;
      }
      i++;
    }
    return queryParams + `api_key=${environment.api_key}`;
  }

  getNowPlayingDates$(): Observable<Dates> {
    return this.http.get<any>(this.nowPlayingMoviesUrl)
      .pipe(
        map(response => response.dates)
      );
  }

  getUpcomingDates$(): Observable<Dates> {
    return this.http.get<any>(this.upcomingMoviesUrl)
      .pipe(
        map(response => response.dates)
      );
  }

  getGenres$(): Observable<Genre[]> {
    return this.http.get<any>(this.genresUrl)
      .pipe(
        map(result => result.genres)
      );
  }

  getMovieDetails$(id: number): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(`${this.movieDetailsUrl}/${id}?api_key=${environment.api_key}`);
  }

  getMovieCredits$(id: number): Observable<MovieCredits> {
    return this.http.get<MovieCredits>(`${this.movieDetailsUrl}/${id}/credits?api_key=${environment.api_key}`);
  }
}
