export interface UrlParams {
    pageNumber: number;
    sortCategory: string;
    withGenres?: string;
    releaseDateGte?: string;
    releaseDateLte?: string;
    withReleaseType?: string;
    voteCountGte?: string;
}
