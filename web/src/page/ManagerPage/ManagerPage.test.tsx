

import { render } from '@testing-library/react';
import { ManagerPage, ManagerPageProps } from './ManagerPage';
import { Film } from '../../types/Film';
import { Booking } from '../../types/Booking';
import { describe, expect, it, vi } from "vitest";

describe('ManagerPage Component Test', () => {
    const mockFilms: Film[] = [
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

    const mockSelectedFilm: Partial<Film> = {
        id: "1",
        name: "Titanic",
        sinopse: "Um romance trágico floresce entre um passageiro pobre e uma aristocrata a bordo do \"inafundável\" RMS Titanic, enfrentando a catástrofe iminente.",
        url: "https://image.tmdb.org/t/p/original/vpsvHLkoeKUjceIMeNSqCp3xEyY.jpg",
        sessions: [{ session: "15:00", value: 10 }, { session: "17:00", value: 10 }, { session: "19:30", value: 15 }]
    };

    const mockBookings: Booking[] = [
        { "id": "1", "filmId": "1", "session": "15:00", "name": "Tiago", "seats": ["B7", "B8"], "value": 20 },
        { "id": "15ed", "filmId": "1", "session": "15:00", "name": "Lucas Gabriel", "seats": ["A1", "A2", "A3", "A4", "A5"], "value": 50 },
        { "id": "ab02", "filmId": "1", "session": "17:00", "name": "João", "seats": ["A4"], "value": 10 },
        { "id": "8253", "filmId": "1", "session": "15:00", "name": "Rafael Pedrosa", "seats": ["F1", "F2"], "value": 20 }
    ];

    const defaultProps: ManagerPageProps = {
        films: mockFilms,
        selectedFilm: mockSelectedFilm,
        onSelectedFilm: vi.fn(),
        bookings: mockBookings
    };

    it('should render "SELECIONE UM FILME" text when selected film is not provided', () => {
        const { getByText } = render(<ManagerPage {...defaultProps} selectedFilm={undefined} />);
        const selectFilmText = getByText('SELECIONE UM FILME');
        expect(selectFilmText).toBeInTheDocument();
    });

    it('should render "SELECIONE UM FILME" text when selected film is null', () => {
        const { getByText } = render(<ManagerPage {...defaultProps} selectedFilm={null} />);
        const selectFilmText = getByText('SELECIONE UM FILME');
        expect(selectFilmText).toBeInTheDocument();
    });

    it('renders correctly', () => {
        const { getByText, queryByText, getAllByText } = render(<ManagerPage {...defaultProps}  />);
        expect(getByText('Sessão 15:00')).toBeInTheDocument();
        expect(getByText('Sessão 17:00')).toBeInTheDocument();
        expect(queryByText('Sessão 19:30')).not.toBeInTheDocument();

        expect(getByText('Lucas Gabriel')).toBeInTheDocument();
        expect(getByText('Rafael Pedrosa')).toBeInTheDocument();
        expect(getByText('João')).toBeInTheDocument();

        expect(getByText('B7, B8')).toBeInTheDocument();
        expect(getByText('A1, A2, A3, A4, A5')).toBeInTheDocument();
        expect(getByText('F1, F2')).toBeInTheDocument();
        expect(getByText('A4')).toBeInTheDocument();

        expect(getByText('R$ 90,00')).toBeInTheDocument();
        expect(getByText('R$ 10,00')).toBeInTheDocument();

        const bookingNameHeaders = getAllByText((content, element) => {
            return element.tagName.toLowerCase() === 'td' && mockBookings.some(booking => booking.name === content);
        });

        expect(bookingNameHeaders.length).toBe(mockBookings.length);
    });

    it('handles empty bookings array correctly', () => {
        const { queryByText } = render(<ManagerPage {...defaultProps} bookings={[]} />);
        expect(queryByText('Sessão')).not.toBeInTheDocument();
        expect(queryByText('Total de Espectadores:')).not.toBeInTheDocument();
        expect(queryByText('Total de Receita:')).not.toBeInTheDocument();
    });

    it('should render alert when no bookings exist', () => {
        const { getByText } = render(<ManagerPage {...defaultProps} bookings={[]} />);
        const alertText = getByText(/Infelizmente ainda não foi comprado nenhum ingresso para o filme/);
        expect(alertText).toBeInTheDocument();
    });
});
