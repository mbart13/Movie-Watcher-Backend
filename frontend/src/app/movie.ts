export interface Movie {
    id: number;
    title: string;
    posterPath: string;
    releaseDate: string;
    voteAverage: number;
    genreIds: number[];
}