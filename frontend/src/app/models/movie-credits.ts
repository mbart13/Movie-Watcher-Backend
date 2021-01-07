import { Person } from "./person";

export interface MovieCredits {
    id: number;
    cast: Person[];
    crew: Person[];
}