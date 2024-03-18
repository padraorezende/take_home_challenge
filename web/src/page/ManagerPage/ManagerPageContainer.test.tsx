import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, expect, it, vi } from "vitest";
import { ManagerPageContainer } from "./ManagerPageContainer";

vi.mock('../../hooks/CinemaApi', () => ({
    __esModule: true,
    useCinemaApi: vi.fn(() => ({
        Film: {
            searchFilmList: vi.fn().mockResolvedValue(
                [
                    {
                        id: "1",
                        name: "Titanic",
                        sinopse: "Um romance trágico floresce entre um passageiro pobre e uma aristocrata a bordo do \"inafundável\" RMS Titanic, enfrentando a catástrofe iminente.",
                        url: "https://image.tmdb.org/t/p/original/vpsvHLkoeKUjceIMeNSqCp3xEyY.jpg",
                        sessions: [{ session: "15:00", value: 10 }, { session: "17:00", value: 10 }, { session: "19:30", value: 15 }]
                    },
                ]
            )
        },
        Booking: {
            searchMovieBooking: vi.fn().mockResolvedValue(
                [
                    { "id": "1", "filmId": "1", "session": "15:00", "name": "Tiago", "seats": ["B7", "B8"], "value": 20 },
                    { "id": "15ed", "filmId": "1", "session": "15:00", "name": "Lucas Gabriel", "seats": ["A1", "A2", "A3", "A4", "A5"], "value": 50 },
                    { "id": "ab02", "filmId": "1", "session": "17:00", "name": "João", "seats": ["A4"], "value": 10 },
                    { "id": "8253", "filmId": "1", "session": "15:00", "name": "Rafael Pedrosa", "seats": ["F1", "F2"], "value": 20 }
                ]
            ),
        }
    }))
}));

describe('Manager Page Container Test', () => {

    it('render correctly ', async () => {

        const initialState = {};
        const store = configureStore({ reducer: (state = initialState) => state });

        const { getByText, container } = render(
            <Provider store={store}>
                <ManagerPageContainer />
            </Provider>
        );

        await waitFor(() => {
            const selectFilmText = getByText('SELECIONE UM FILME');
            expect(selectFilmText).toBeInTheDocument();

            const firstFilmDisplay = container.querySelector('[data-testid="film-display"]:first-child');

            fireEvent.click(firstFilmDisplay);

            expect(selectFilmText).not.toBeInTheDocument();

        });
    });
});
