import axios from "axios";
import MockAdapter from 'axios-mock-adapter';
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { ApiModelConfig } from "../../types/api/ApiModelConfig";
import { FilmApi } from "../FilmApi";
import { Film } from "../../types/Film";

describe('FilmApi Test Class', () => {
    const mockConfig: Partial<ApiModelConfig> = {
        baseUrlExterna: 'mockBaseUrlExterna',
        baseUrlLocal: 'mockBaseUrlLocal',
        modelName: 'mockModelName',
        modelPluralName: 'mockModelPluralName'
    };

    let filmApi: FilmApi;
    let mockAxios: MockAdapter;

    beforeEach(() => {
        mockAxios = new MockAdapter(axios);
        filmApi = new FilmApi(mockConfig);
    });

    afterEach(() => {
        mockAxios.restore();
    });

    describe('searchFilmList', () => {
        it('should fetch the list of films successfully', async () => {
            const expectedResponse = [
                {
                    id: '1',
                    name: 'Titanic',
                    sinopse: 'Um romance trágico floresce entre um passageiro pobre e uma aristocrata a bordo do "inafundável" RMS Titanic, enfrentando a catástrofe iminente.',
                    url: 'https://image.tmdb.org/t/p/original/vpsvHLkoeKUjceIMeNSqCp3xEyY.jpg',
                    sessions: [{ session: '15:00', value: 10 }, { session: '17:00', value: 10 }, { session: '19:30', value: 15 }]
                },
                {
                    id: '2',
                    name: 'De volta para o Futuro',
                    sinopse: 'Um adolescente viaja no tempo em um DeLorean modificado e tenta garantir que seus pais se apaixonem para preservar seu futuro.',
                    url: 'https://i.pinimg.com/originals/91/11/57/911157d7fafe13b698e914117f919d6b.jpg',
                    sessions: [{ session: '15:00', value: 10 }, { session: '17:00', value: 15 }]
                }
            ];

            mockAxios.onGet('').reply(200, expectedResponse);

            const result = await filmApi.searchFilmList();

            expect(result).toEqual(expectedResponse);
        });

        it('should fetch the list of films successfully but the response is empty', async () => {
            const expectedResponse = [];

            mockAxios.onGet('').reply(200, expectedResponse);

            const result = await filmApi.searchFilmList();

            expect(result).toEqual(expectedResponse);
        });

        it('should handle empty response', async () => {
            const expectedResponse: Film[] = [];

            mockAxios.onGet('').reply(200, []);

            const result = await filmApi.searchFilmList();

            expect(result).toEqual(expectedResponse);
        });

        it('should handle network errors', async () => {
            const mockError = new Error('Network Error');

            mockAxios.onGet('').networkError();

            await expect(filmApi.searchFilmList()).rejects.toThrow(mockError);
        });

        it('should handle timeout errors', async () => {
            const mockError = new Error('timeout of 60000ms exceeded');

            mockAxios.onGet('').timeout();

            await expect(filmApi.searchFilmList()).rejects.toThrow(mockError);
        });
    });

    describe('searchTheFilm', () => {

        it('should fetch the film with the provided id successfully', async () => {
            const id = '1';
            const expectedResponse = {
                id: '1',
                name: 'Titanic',
                sinopse: 'Um romance trágico floresce entre um passageiro pobre e uma aristocrata a bordo do "inafundável" RMS Titanic, enfrentando a catástrofe iminente.',
                url: 'https://image.tmdb.org/t/p/original/vpsvHLkoeKUjceIMeNSqCp3xEyY.jpg',
                sessions: [{ session: '15:00', value: 10 }, { session: '17:00', value: 10 }, { session: '19:30', value: 15 }]
            };

            mockAxios.onGet('', { params: { id } }).reply(200, expectedResponse);

            const result = await filmApi.searchTheFilm(id);

            expect(result).toEqual(expectedResponse);
        });

        it('should fetch the film with the provided id', async () => {
            const id = '123';
            const expectedResponse = [];

            mockAxios.onGet('', { params: { id } }).reply(200, expectedResponse);

            const result = await filmApi.searchTheFilm(id);

            expect(result).toEqual(expectedResponse);
        });

        it('should handle empty response', async () => {
            const id = '123';
            const expectedResponse: Film[] = [];

            mockAxios.onGet('', { params: { id } }).reply(200, []);

            const result = await filmApi.searchTheFilm(id);

            expect(result).toEqual(expectedResponse);
        });

        it('should handle network errors', async () => {
            const id = '123';
            const mockError = new Error('Network Error');

            mockAxios.onGet('', { params: { id } }).networkError();

            await expect(filmApi.searchTheFilm(id)).rejects.toThrow(mockError);
        });

        it('should handle timeout errors', async () => {
            const id = '123';
            const mockError = new Error('timeout of 60000ms exceeded');

            mockAxios.onGet('', { params: { id } }).timeout();

            await expect(filmApi.searchTheFilm(id)).rejects.toThrow(mockError);
        });
    });
});