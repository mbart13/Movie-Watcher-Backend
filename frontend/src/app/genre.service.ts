import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import {  map } from 'rxjs/operators';
import { Genre } from './genre';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  genresUrl: string = `${environment.tmdb_base_url}/genre/movie/list?api_key=${environment.api_key}`

  constructor(private http: HttpClient) { }

  getGenres(): Observable<Genre[]> {
    return this.http.get<any>(this.genresUrl)
      .pipe(map(result => result.genres));
  }

}
