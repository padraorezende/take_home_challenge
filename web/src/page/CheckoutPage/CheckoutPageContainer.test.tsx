import { configureStore } from "@reduxjs/toolkit";
import { render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { Mock, beforeEach, describe, expect, it, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { useCinemaApi } from '../../hooks/CinemaApi';
import { CheckoutPageContainer } from "./CheckoutPageContainer";

const mockedUseCinemaApi = useCinemaApi as Mock

vi.mock('../../hooks/CinemaApi', () => ({
    __esModule: true,
    useCinemaApi: vi.fn()
}));

describe('Checkout Page Container Test', () => {
    const mockedSearchTheFilm = vi.fn()
    const mockedSearchMovieSessionBooking = vi.fn()
    const mockedUpdateBookings = vi.fn()

    beforeEach(() => {
        mockedUseCinemaApi.mockReturnValue({
            Film: {
                searchTheFilm: mockedSearchTheFilm
            },
            Booking: {
                searchMovieSessionBooking: mockedSearchMovieSessionBooking,
                updateBookings: mockedUpdateBookings
            }
        })
    })


    it('render correctly ', async () => {
        const initialState = {};
        
        const store = configureStore({ reducer: (state = initialState) => state });
        mockedSearchTheFilm.mockResolvedValue(
            [{
                id: "1",
                name: "Titanic",
                sinopse: "Um romance trágico floresce entre um passageiro pobre e uma aristocrata a bordo do \"inafundável\" RMS Titanic, enfrentando a catástrofe iminente.",
                url: "https://image.tmdb.org/t/p/original/vpsvHLkoeKUjceIMeNSqCp3xEyY.jpg",
                sessions: [{ session: "15:00", value: 10 }, { session: "17:00", value: 10 }, { session: "19:30", value: 15 }]
            }],
        )
        mockedSearchMovieSessionBooking.mockResolvedValue(
            [
                { id: "1", filmId: "1", session: "15:00", name: "Tiago", seats: ["B7", "B8"], value: 20 },
                { id: "15ed", filmId: "1", session: "15:00", name: "Lucas Gabriel", seats: ["A1", "A2", "A3", "A4", "A5"], value: 50 },
                { id: "8253", filmId: "1", session: "15:00", name: "Rafael Pedrosa", seats: ["F1", "F2"], value: 20 }
            ]
        )

        mockedUpdateBookings.mockResolvedValue({})


        const { getByText } = render(

            <Provider store={store}>
                <BrowserRouter>
                    <CheckoutPageContainer idFilm="1" />
                </BrowserRouter>
            </Provider>
        );

        await waitFor(() => {
            expect(getByText("Titanic")).toBeInTheDocument();
            expect(getByText("Um romance trágico floresce entre um passageiro pobre e uma aristocrata a bordo do \"inafundável\" RMS Titanic, enfrentando a catástrofe iminente.")).toBeInTheDocument();
            expect(getByText("15:00")).toBeInTheDocument();
            expect(getByText("17:00")).toBeInTheDocument();
            expect(getByText("19:30")).toBeInTheDocument();

        });
    });

    
    it('render correctly another film', async () => {
        const initialState = {};
        
        const store = configureStore({ reducer: (state = initialState) => state });
        mockedSearchTheFilm.mockResolvedValue(
            [{
                id: "1",
                name: "zTitanic",
                sinopse: "Uma comédia trágica floresce entre um passageiro pobre e uma aristocrata a bordo do \"inafundável\" RMS Titanic, enfrentando a catástrofe iminente.",
                url: "https://image.tmdb.org/t/p/original/vpsvHLkoeKUjceIMeNSqCp3xEyY.jpg",
                sessions: [{ session: "15:00", value: 10 }, { session: "17:00", value: 10 }, { session: "19:30", value: 15 }]
            }],
        )
        mockedSearchMovieSessionBooking.mockResolvedValue(
            [
                { id: "1", filmId: "1", session: "15:00", name: "Tiago", seats: ["B7", "B8"], value: 20 },
                { id: "15ed", filmId: "1", session: "15:00", name: "Lucas Gabriel", seats: ["A1", "A2", "A3", "A4", "A5"], value: 50 },
                { id: "8253", filmId: "1", session: "15:00", name: "Rafael Pedrosa", seats: ["F1", "F2"], value: 20 }
            ]
        )

        mockedUpdateBookings.mockResolvedValue({})


        const { getByText } = render(

            <Provider store={store}>
                <BrowserRouter>
                    <CheckoutPageContainer idFilm="1" />
                </BrowserRouter>
            </Provider>
        );

        await waitFor(() => {
            expect(getByText("zTitanic")).toBeInTheDocument();
            expect(getByText("Uma comédia trágica floresce entre um passageiro pobre e uma aristocrata a bordo do \"inafundável\" RMS Titanic, enfrentando a catástrofe iminente.")).toBeInTheDocument();
            expect(getByText("15:00")).toBeInTheDocument();
            expect(getByText("17:00")).toBeInTheDocument();
            expect(getByText("19:30")).toBeInTheDocument();

        });
    });
});
