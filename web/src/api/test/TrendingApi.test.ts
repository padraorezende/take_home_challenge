import axios from "axios";
import MockAdapter from 'axios-mock-adapter';
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { ApiModelConfig } from "../../types/api/ApiModelConfig";
import { TrendingApi } from "../TrendingApi";

describe('TrendingApi Test Class', () => {
    const mockConfig: Partial<ApiModelConfig> = {
        baseUrlExterna: 'mockBaseUrlExterna',
        baseUrlLocal: 'mockBaseUrlLocal',
        modelName: 'mockModelName',
        modelPluralName: 'mockModelPluralName'
    };

    let trendingApi: TrendingApi;
    let mockAxios: MockAdapter;

    beforeEach(() => {
        mockAxios = new MockAdapter(axios);
        trendingApi = new TrendingApi(mockConfig);
    });

    afterEach(() => {
        mockAxios.restore();
    });

    describe('searchTrendingMovies', () => {
        it('should fetch trending movies with provided language', async () => {
            const language = 'en';
            const expectedResponse = {};

            mockAxios.onGet('/movie/day', { params: { language } }).reply(200, expectedResponse);

            const result = await trendingApi.searchTrendingMovies(language);

            expect(result).toEqual(expectedResponse);
        });

        it('should throw an error if request fails', async () => {
            const language = 'en';
            const mockError = new Error('Request failed with status code 500');

            mockAxios.onGet('/movie/day', { params: { language } }).reply(500, mockError);

            await expect(trendingApi.searchTrendingMovies(language)).rejects.toThrow(mockError);
        });

        it('should handle invalid language parameter', async () => {
            const language = '';
            const expectedErrorMessage = 'Request failed with status code 404';

            await expect(trendingApi.searchTrendingMovies(language)).rejects.toThrow(expectedErrorMessage);
        });

        it('should handle empty response', async () => {
            const language = 'en';
            const expectedResponse = {};

            mockAxios.onGet('/movie/day', { params: { language } }).reply(200, expectedResponse);

            const result = await trendingApi.searchTrendingMovies(language);

            expect(result).toEqual(expectedResponse);
        });

        it('should handle network errors', async () => {
            const language = 'en';
            const mockError = new Error('Network Error');

            mockAxios.onGet('/movie/day', { params: { language } }).networkError();

            await expect(trendingApi.searchTrendingMovies(language)).rejects.toThrow(mockError);
        });

        it('should handle timeout errors', async () => {
            const language = 'en';
            const mockError = new Error('timeout of 60000ms exceeded');

            mockAxios.onGet('/movie/day', { params: { language } }).timeout();

            await expect(trendingApi.searchTrendingMovies(language)).rejects.toThrow(mockError);
        });

        it('should handle unexpected response status code', async () => {
            const language = 'en';
            const unexpectedStatusCode = 404;
            const mockError = new Error(`Request failed with status code ${unexpectedStatusCode}`);

            mockAxios.onGet('/movie/day', { params: { language } }).reply(unexpectedStatusCode);

            await expect(trendingApi.searchTrendingMovies(language)).rejects.toThrow(mockError);
        });

        it('should return trending movies successfully', async () => {
            const language = 'en';
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

            mockAxios.onGet('/movie/day', { params: { language } }).reply(200, trendings);

            const result = await trendingApi.searchTrendingMovies(language);

            expect(result).toEqual(trendings);
        });
    });
});