import { configureStore } from "@reduxjs/toolkit";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, expect, it, vi } from "vitest";
import { SelectionContainer } from "./SelectionPageContainer";
import { BrowserRouter } from "react-router-dom";


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
                    {
                        id: "2",
                        name: "De volta para o Futuro",
                        sinopse: "Um adolescente viaja no tempo em um DeLorean modificado e tenta garantir que seus pais se apaixonem para preservar seu futuro.",
                        url: "https://i.pinimg.com/originals/91/11/57/911157d7fafe13b698e914117f919d6b.jpg",
                        sessions: [{ session: "15:00", value: 10 }, { session: "17:00", value: 15 }]
                    }
                ]
            )
        }
    }))
}));

describe('SelectionPage Container  Test', () => {

    it('render correctly ', async () => {

        const initialState = {};
        const store = configureStore({ reducer: (state = initialState) => state });

        const { getAllByTestId, container } = render(

            <Provider store={store}>
                <BrowserRouter>
                    <SelectionContainer />
                </BrowserRouter>
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByText("Filmes em cartaz")).toBeInTheDocument();
            expect(screen.getByText("Venha relembrar esses filmes icônicos do cinema")).toBeInTheDocument();

            const filmDisplays = getAllByTestId('film-display');
            expect(filmDisplays.length).toBe(2);

            const roomImg = screen.getByAltText("Cinemark Room");
            expect(roomImg).toBeInTheDocument();
            expect(roomImg).toHaveAttribute("src", "/src/assets/room.jpg");

            const armchairImg = screen.getByAltText("Cinemark Armchair");
            expect(armchairImg).toBeInTheDocument();
            expect(armchairImg).toHaveAttribute("src", "/src/assets/armchair.jpg");

            const firstFilmDisplay = container.querySelector('[data-testid="film-display"]:first-child');

            expect(firstFilmDisplay).toBeInTheDocument();
            fireEvent.click(firstFilmDisplay);

        });
    });
});
