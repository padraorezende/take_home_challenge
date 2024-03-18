import { afterEach, beforeEach, describe, expect, it } from "vitest";
import MockAdapter from 'axios-mock-adapter';
import axios from "axios";
import { ApiModelConfig } from "../../types/api/ApiModelConfig";
import { BookingApi } from "../BookingApi";
import { Booking } from "../../types/Booking";

describe('BookingApi Test Class', () => {
    const mockConfig: Partial<ApiModelConfig> = {
        baseUrlExterna: 'mockBaseUrlExterna',
        baseUrlLocal: 'mockBaseUrlLocal',
        modelName: 'mockModelName',
        modelPluralName: 'mockModelPluralName'
    };

    let bookingApi: BookingApi;
    let mockAxios: MockAdapter;

    beforeEach(() => {
        mockAxios = new MockAdapter(axios);
        bookingApi = new BookingApi(mockConfig);
    });

    afterEach(() => {
        mockAxios.restore();
    });

    describe('searchMovieSessionBooking', () => {
        it('should fetch the movie session booking successfully with empty response', async () => {
            const filmId = '1';
            const session = '15:00';
            const expectedResponse = [];

            mockAxios.onGet('', { params: { filmId, session } }).reply(200, expectedResponse);

            const result = await bookingApi.searchMovieSessionBooking(filmId, session);

            expect(result).toEqual(expectedResponse);
        });

        it('should fetch the movie session booking successfully', async () => {
            const filmId = '1';
            const session = '15:00';
            const expectedResponse = [
                { "id": "1", "filmId": "1", "session": "15:00", "name": "Tiago", "seats": ["B7", "B8"], "value": 20 },
                { "id": "15ed", "filmId": "1", "session": "15:00", "name": "Lucas Gabriel", "seats": ["A1", "A2", "A3", "A4", "A5"], "value": 50 },
                { "id": "8253", "filmId": "1", "session": "15:00", "name": "Rafael Pedrosa", "seats": ["F1", "F2"], "value": 20 }
            ];

            mockAxios.onGet('', { params: { filmId, session } }).reply(200, expectedResponse);

            const result = await bookingApi.searchMovieSessionBooking(filmId, session);

            expect(result).toEqual(expectedResponse);
        });

        it('should handle empty response', async () => {
            const filmId = '1';
            const session = '15:00';
            const expectedResponse: Booking[] = [];

            mockAxios.onGet('', { params: { filmId, session } }).reply(200, []);

            const result = await bookingApi.searchMovieSessionBooking(filmId, session);

            expect(result).toEqual(expectedResponse);
        });

        it('should handle network errors', async () => {
            const filmId = '1';
            const session = '15:00';
            const mockError = new Error('Network Error');

            mockAxios.onGet('', { params: { filmId, session } }).networkError();

            await expect(bookingApi.searchMovieSessionBooking(filmId, session)).rejects.toThrow(mockError);
        });

        it('should handle timeout errors', async () => {
            const filmId = '1';
            const session = '15:00';
            const mockError = new Error('timeout of 60000ms exceeded');

            mockAxios.onGet('', { params: { filmId, session } }).timeout();

            await expect(bookingApi.searchMovieSessionBooking(filmId, session)).rejects.toThrow(mockError);
        });
    });

    describe('searchMovieBooking', () => {
        it('should fetch the movie booking successfully with empty response', async () => {
            const filmId = '1';
            const expectedResponse = [];

            mockAxios.onGet('', { params: { filmId } }).reply(200, expectedResponse);

            const result = await bookingApi.searchMovieBooking(filmId);

            expect(result).toEqual(expectedResponse);
        });

        it('should fetch the movie booking successfully', async () => {
            const filmId = '1';
            const expectedResponse = [
                { "id": "1", "filmId": "1", "session": "15:00", "name": "Tiago", "seats": ["B7", "B8"], "value": 20 },
                { "id": "15ed", "filmId": "1", "session": "15:00", "name": "Lucas Gabriel", "seats": ["A1", "A2", "A3", "A4", "A5"], "value": 50 },
                { "id": "ab02", "filmId": "1", "session": "17:00", "name": "João", "seats": ["A4"], "value": 10 },
                { "id": "8253", "filmId": "1", "session": "15:00", "name": "Rafael Pedrosa", "seats": ["F1", "F2"], "value": 20 }
            ];

            mockAxios.onGet('', { params: { filmId } }).reply(200, expectedResponse);

            const result = await bookingApi.searchMovieBooking(filmId);

            expect(result).toEqual(expectedResponse);
        });

        it('should handle empty response', async () => {
            const filmId = '1';
            const expectedResponse: Booking[] = [];

            mockAxios.onGet('', { params: { filmId } }).reply(200, []);

            const result = await bookingApi.searchMovieBooking(filmId);

            expect(result).toEqual(expectedResponse);
        });

        it('should handle network errors', async () => {
            const filmId = '1';
            const mockError = new Error('Network Error');

            mockAxios.onGet('', { params: { filmId } }).networkError();

            await expect(bookingApi.searchMovieBooking(filmId)).rejects.toThrow(mockError);
        });

        it('should handle timeout errors', async () => {
            const filmId = '1';
            const mockError = new Error('timeout of 60000ms exceeded');

            mockAxios.onGet('', { params: { filmId } }).timeout();

            await expect(bookingApi.searchMovieBooking(filmId)).rejects.toThrow(mockError);
        });
    });

    describe('updateBookings', () => {
        it('should update bookings successfully with empty response', async () => {
            const payload = {};
            const expectedResponse = {};

            mockAxios.onPost('', payload).reply(200, expectedResponse);

            const result = await bookingApi.updateBookings(payload);

            expect(result).toEqual(expectedResponse);
        });

        it('should update bookings successfully', async () => {
            const payload = {};
            const expectedResponse = {};

            mockAxios.onPost('', payload).reply(200, expectedResponse);

            const result = await bookingApi.updateBookings(payload);

            expect(result).toEqual(expectedResponse);
        });

        it('should handle network errors', async () => {
            const payload = {};
            const mockError = new Error('Network Error');

            mockAxios.onPost('').networkError();

            await expect(bookingApi.updateBookings(payload)).rejects.toThrow(mockError);
        });

        it('should handle timeout errors', async () => {
            const payload = {};
            const mockError = new Error('timeout of 60000ms exceeded');

            mockAxios.onPost('').timeout();

            await expect(bookingApi.updateBookings(payload)).rejects.toThrow(mockError);
        });
    });
});