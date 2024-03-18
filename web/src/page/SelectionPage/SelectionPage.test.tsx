import { render, screen, fireEvent } from '@testing-library/react';
import { SelectionPage } from './SelectionPage';
import { describe, expect, it, vi } from "vitest";

const films = [
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
];

describe('SelectionPage Page', () => {
    it('renders correctly', () => {
        const onSelectedFilmMock = vi.fn();
        const { getAllByTestId } = render(<SelectionPage films={films} onSelectedFilm={onSelectedFilmMock} />);

        expect(screen.getByText("Filmes em cartaz")).toBeInTheDocument();
        expect(screen.getByText("Venha relembrar esses filmes icônicos do cinema")).toBeInTheDocument();

        const filmDisplays = getAllByTestId('film-display');
        expect(filmDisplays.length).toBe(films.length);

        filmDisplays.forEach((filmDisplay, index) => {
            expect(filmDisplay).toBeInTheDocument();
            expect(filmDisplay).toHaveAttribute('href', '#');
            fireEvent.click(filmDisplay);
            expect(onSelectedFilmMock).toHaveBeenCalledWith(films[index]);
        });

        const roomImg = screen.getByAltText("Cinemark Room");
        expect(roomImg).toBeInTheDocument();
        expect(roomImg).toHaveAttribute("src", "/src/assets/room.jpg");

        const armchairImg = screen.getByAltText("Cinemark Armchair");
        expect(armchairImg).toBeInTheDocument();
        expect(armchairImg).toHaveAttribute("src", "/src/assets/armchair.jpg");

    });

    it('clicking on a film calls onSelectedFilm with the correct film', () => {
        const onSelectedFilmMock = vi.fn();
        const { container } = render(<SelectionPage films={films} onSelectedFilm={onSelectedFilmMock} />);

        const firstFilmDisplay = container.querySelector('[data-testid="film-display"]:first-child');

        expect(firstFilmDisplay).toBeInTheDocument();
        fireEvent.click(firstFilmDisplay);
        expect(onSelectedFilmMock).toHaveBeenCalledWith(films[0]);

        const secondFilmDisplay = container.querySelector('[data-testid="film-display"]:nth-child(2)')

        expect(secondFilmDisplay).toBeInTheDocument();
        fireEvent.click(secondFilmDisplay);
        expect(onSelectedFilmMock).toHaveBeenCalledWith(films[1]);

    });

    it('clicking on the arrow button scrolls to film list', () => {
        const { container } = render(<SelectionPage films={films} onSelectedFilm={() => { }} />);

        const scrollIntoViewMock = vi.fn();
        window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

        const arrowButton = container.querySelector('[data-testid="ArrowDownwardIcon"]')
        fireEvent.click(arrowButton);

        expect(scrollIntoViewMock).toHaveBeenCalled();
    });

    it('hides the arrow button when scrolled more than 50% of the window height', () => {
        const { container } = render(<SelectionPage films={films} onSelectedFilm={() => { }} />);

        vi.spyOn(window, 'scrollY', 'get').mockReturnValue(600);
        vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(1000);
        vi.spyOn(document.body, 'clientHeight', 'get').mockReturnValue(2000);

        fireEvent.scroll(window);

        const arrowButton = container.querySelector('[data-testid="ArrowDownwardIcon"]');
        expect(arrowButton).not.toBeInTheDocument();
    });


    it('shows the arrow button when scrolled less than 50% of the window height', () => {
        const { container } = render(<SelectionPage films={films} onSelectedFilm={() => { }} />);

        vi.spyOn(window, 'scrollY', 'get').mockReturnValue(200);
        vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(1000);
        vi.spyOn(document.body, 'clientHeight', 'get').mockReturnValue(2000);

        fireEvent.scroll(window);

        const arrowButton = container.querySelector('[data-testid="ArrowDownwardIcon"]');
        expect(arrowButton).toBeInTheDocument();
    });
});
