import { Genre } from './genre';

export interface MovieDetails {
    id: number;
    original_language: string;
    original_title: string;
    genres: Genre[];
    overview: string;
    poster_path: string;
    release_date: string;
    runtime: number;
    status: string;
    tagline: string;
    title: string;
    vote_average: number;
}
