import { describe, expect, it, vi } from "vitest";
import { CarouselFilms } from "./CarouselFilms";
import { fireEvent, render, } from "@testing-library/react";

const films = [
    {
        id: "1",
        name: "Titanic",
        sinopse: "Um romance trágico floresce entre um passageiro pobre e uma aristocrata a bordo do \"inafundável\" RMS Titanic, enfrentando a catástrofe iminente.",
        url: "https://image.tmdb.org/t/p/original/vpsvHLkoeKUjceIMeNSqCp3xEyY.jpg",
        sessions: [ { session: "15:00", value: 10 }, { session: "17:00", value: 10 }, { session: "19:30", value: 15 } ]
    },
    {
        id: "2",
        name: "De volta para o Futuro",
        sinopse: "Um adolescente viaja no tempo em um DeLorean modificado e tenta garantir que seus pais se apaixonem para preservar seu futuro.",
        url: "https://i.pinimg.com/originals/91/11/57/911157d7fafe13b698e914117f919d6b.jpg",
        sessions: [ { session: "15:00", value: 10 }, { session: "17:00", value: 15 } ]
    }
];


describe('CarouselFilms Component Test', () => {

    it('renders correctly with provided films', () => {
        const onSelectedFilmMock = vi.fn();
        const { getAllByTestId } = render(
            <CarouselFilms films={films} onSelectedFilm={onSelectedFilmMock} />
        );

        const filmDisplays = getAllByTestId('film-display');
        expect(filmDisplays.length).toBe(films.length);


        filmDisplays.forEach((filmDisplay, index) => {
            expect(filmDisplay).toBeInTheDocument();
            expect(filmDisplay).toHaveAttribute('href', '#');
            fireEvent.click(filmDisplay);
            expect(onSelectedFilmMock).toHaveBeenCalledWith(films[index]);
        });
    });

    it('clicking on a film calls onSelectedFilm with the correct film', () => {
        const onSelectedFilmMock = vi.fn();
        const { container } = render(<CarouselFilms films={films} onSelectedFilm={onSelectedFilmMock} />);
        const firstFilmDisplay = container.querySelector('[data-testid="film-display"]:first-child');

        expect(firstFilmDisplay).toBeInTheDocument();
        fireEvent.click(firstFilmDisplay);
        expect(onSelectedFilmMock).toHaveBeenCalledWith(films[0]);


        const secondFilmDisplay = container.querySelector('[data-testid="film-display"]:nth-child(2)')

        expect(secondFilmDisplay).toBeInTheDocument();
        fireEvent.click(secondFilmDisplay);
        expect(onSelectedFilmMock).toHaveBeenCalledWith(films[1]);
    });
});