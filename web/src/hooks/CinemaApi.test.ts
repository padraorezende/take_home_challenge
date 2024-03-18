

import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useCinemaApi } from "./CinemaApi";

describe('useCinemaApi', () => {
    it('returns the cinema API instance', () => {
        const { result } = renderHook(() => useCinemaApi())

        expect(result.current.Film).toBeDefined()
        expect(result.current.Booking).toBeDefined()
        expect(result.current.Trending).toBeDefined()
    })

    it('provides access to methods in FilmApi', () => {
        const { result } = renderHook(() => useCinemaApi())

        expect(result.current.Film.searchFilmList).toBeDefined()
        expect(result.current.Film.searchTheFilm).toBeDefined()
    })

    it('provides access to methods in BookingApi', () => {
        const { result } = renderHook(() => useCinemaApi())

        expect(result.current.Booking.searchMovieBooking).toBeDefined()
        expect(result.current.Booking.searchMovieSessionBooking).toBeDefined()
        expect(result.current.Booking.updateBookings).toBeDefined()
    })

    it('provides access to methods in TrendingApi', () => {
        const { result } = renderHook(() => useCinemaApi())

        expect(result.current.Trending.searchTrendingMovies).toBeDefined()
    })

    it('returns the same instance of the cinema API across renders', () => {
        const { result, rerender } = renderHook(() => useCinemaApi())

        const initialInstance = result.current
        rerender()
        const updatedInstance = result.current

        expect(initialInstance).toBe(updatedInstance)
    })
})