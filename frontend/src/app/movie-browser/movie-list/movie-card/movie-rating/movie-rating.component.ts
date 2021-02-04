import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-movie-rating',
  templateUrl: './movie-rating.component.html',
  styleUrls: ['./movie-rating.component.css']
})
export class MovieRatingComponent implements OnInit {

  @Input()
  rating: number;

  @Input()
  size: string;

  constructor() { }

  ngOnInit(): void {
  }

  colorBorder(rating: number): string {
    let color: string;
    if (rating >= 8) {
      color = 'green';
    } else if (rating >= 5) {
      color = 'orange';
    } else {
      color = 'red';
    }
    return color;
  }

  applyFontSize(): any {
    if (this.size === 'large') {
      return { 'font-size': '1.3em' };
    }
  }

}
