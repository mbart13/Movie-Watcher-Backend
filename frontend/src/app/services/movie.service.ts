import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject  } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Genre } from '../models/genre';
import { Movie } from '../models/movie';
import { MovieCredits } from '../models/movie-credits';
import { MovieDetails } from '../models/movie-details';
import { Dates } from '../models/dates';
import { UrlConst } from '../models/url.constants';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  urlParamsNames: string[] = [
    'sort_by', 'page', 'primary_release_date.gte', 'primary_release_date.lte', 'with_release_type', 'vote_count.gte', 'with_genres'
  ];

  urlParams = {
    sortCategory: UrlConst.POPULARITY_DESC,
    pageNumber: UrlConst.PAGE_NUMBER,
    releaseDateGte: '',
    releaseDateLte: '',
    withReleaseType: '',
    voteCountGte: UrlConst.DEFAULT_VOTE_COUNT,
    withGenres: ''
  };

  movies$: BehaviorSubject<Movie[]> = new BehaviorSubject([]);
  genres$: Observable<Genre[]>;
  genresUrl = `${environment.tmdb_base_url}/genre/movie/list?api_key=${environment.api_key}`;
  nowPlayingMoviesUrl = `${environment.tmdb_base_url}/movie/now_playing?api_key=${environment.api_key}`;
  upcomingMoviesUrl = `${environment.tmdb_base_url}/movie/upcoming?api_key=${environment.api_key}`;
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
    this.urlParams.pageNumber = 1;
    this.urlParams.sortCategory = UrlConst.POPULARITY_DESC;
    this.urlParams.releaseDateGte = '';
    this.urlParams.releaseDateLte = '';
    this.urlParams.withReleaseType = '';
    this.urlParams.voteCountGte = 0;
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
    if (!this.genres$) {
      this.genres$ = this.http.get<any>(this.genresUrl)
        .pipe(
          map(result => result.genres),
          shareReplay()
        );
    }
    return this.genres$;
  }

  getMovieDetails$(id: number): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(`${this.movieDetailsUrl}/${id}?api_key=${environment.api_key}`);
  }

  getMovieCredits$(id: number): Observable<MovieCredits> {
    return this.http.get<MovieCredits>(`${this.movieDetailsUrl}/${id}/credits?api_key=${environment.api_key}`);
  }
}
