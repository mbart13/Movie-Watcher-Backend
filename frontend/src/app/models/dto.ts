import { Movie } from './movie';

export interface MovieDto {
  page: number;
  total_pages: number;
  results: Movie[];
}
