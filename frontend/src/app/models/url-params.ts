export interface UrlParams {
    sortCategory: string;
    pageNumber: number;
    releaseDateGte?: string;
    releaseDateLte?: string;
    withReleaseType?: string;
    voteCountGte?: number;
    withGenres?: string;
}
