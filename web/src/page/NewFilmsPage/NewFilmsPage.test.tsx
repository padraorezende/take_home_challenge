
import { render } from '@testing-library/react';
import { describe, expect, it } from "vitest";
import { NewFilmsPage } from './NewFilmsPage';

const trendings = [
    {
        adult: false, backdrop_path: "/pwGmXVKUgKN13psUjlhC9zBcq1o.jpg", id: 634492, title: "Madame Web", original_language: "en", original_title: "Madame Web",
        overview: "Forced to confront revelations about her past, paramedic Cassandra Webb forges a relationship with three young women destined for powerful futures...if they can all survive a deadly present.",
        poster_path: "/rULWuutDcN5NvtiZi4FRPzRYWSh.jpg", media_type: "movie", genre_ids: [28, 14], popularity: 303.923, release_date: "2024-02-14", video: false, vote_average: 5.366, vote_count: 407
    },
    {
        adult: false, backdrop_path: "/qz2QzkYzesbbL94rdUpZrFPhlRe.jpg", id: 1019420, title: "Irish Wish", original_language: "en", original_title: "Irish Wish",
        overview: "Maddie's dream guy is days away from marrying her best friend when a wish for true love made on an ancient stone in Ireland magically alters her fate.",
        poster_path: "/v4Bb70dpIIQoEnZAHnm3nzCPauU.jpg", media_type: "movie", genre_ids: [10749, 35], popularity: 66.616, release_date: "2024-03-14", video: false, vote_average: 6.341, vote_count: 22
    }
];

describe('NewFilmsPage Page', () => {
    it('renders correctly', () => {
        const { getByText, getByAltText } = render(<NewFilmsPage trendings={trendings} />);

        trendings.forEach((film) => {
            const titleElement = getByText(film.title);
            const popularityElement = getByText(`Popularity: ${film.popularity}`);
            const imageElement = getByAltText(film.title);

            expect(titleElement).toBeInTheDocument();
            expect(popularityElement).toBeInTheDocument();
            expect(imageElement).toBeInTheDocument();
            expect(imageElement).toHaveAttribute('src', `https://image.tmdb.org/t/p/w500${film.poster_path}`);
        });
    });
});