import {Component, Input, OnInit} from '@angular/core';
import {MovieDetails} from '../../models/movie-details';
import {MovieCredits} from '../../models/movie-credits';
import {environment} from '../../../environments/environment';
import {Person} from '../../models/person';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.css']
})
export class MovieInfoComponent implements OnInit {

  @Input()
  data: { movieDetails: MovieDetails, movieCredits: MovieCredits };
  env: string = environment.tmdb_imagesUrl_w500;

  constructor() { }

  ngOnInit(): void {
  }

  findCrewMembers(crew: Person[], job: string): Person[] {
    return crew.filter(crewMember => crewMember.job.toLowerCase() === job);
  }
}
