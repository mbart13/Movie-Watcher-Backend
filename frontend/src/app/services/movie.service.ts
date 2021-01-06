import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  moviesUrl: string = `${environment.tmdb_base_url}/discover/movie?sort_by=popularity.desc&api_key=${environment.api_key}`

  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    return this.http.get<any>(this.moviesUrl)
      .pipe(map(data => data.results));
  }

}
