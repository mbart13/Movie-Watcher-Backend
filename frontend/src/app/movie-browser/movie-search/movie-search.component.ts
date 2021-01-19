import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MovieService } from '../../shared/movie.service';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {

  private searchTerm = new Subject<string>();

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.searchTerm.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      tap(searchTerm => this.movieService.searchMovies(searchTerm))
    ).subscribe();
  }

  search(term: string): void {
    this.searchTerm.next(term);
  }

}
