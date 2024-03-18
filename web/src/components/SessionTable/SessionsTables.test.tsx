import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SessionsTables } from "./SessionsTables";

const bookings = [
    { "id": "1", "filmId": "1", "session": "15:00", "name": "Tiago", "seats": ["B7", "B8"], "value": 20 },
    { "id": "15ed", "filmId": "1", "session": "15:00", "name": "Lucas Gabriel", "seats": ["A1", "A2", "A3", "A4", "A5"], "value": 50 },
    { "id": "ab02", "filmId": "1", "session": "17:00", "name": "João", "seats": ["A4"], "value": 10 },
    { "id": "8253", "filmId": "1", "session": "15:00", "name": "Rafael Pedrosa", "seats": ["F1", "F2"], "value": 20 }
];

const sessions = ["15:00", "17:00", "19:30"]

describe("SessionsTables Component test", () => {
    it('renders correctly', () => {
        const { getByText, queryByText, getAllByText } = render(<SessionsTables sessions={sessions} bookings={bookings} />);

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
            return element.tagName.toLowerCase() === 'td' && bookings.some(booking => booking.name === content);
        });

        expect(bookingNameHeaders.length).toBe(bookings.length);
    });

    it('handles empty sessions array correctly', () => {
        const { queryByText } = render(<SessionsTables sessions={[]} bookings={bookings} />);
        expect(queryByText('Sessão')).not.toBeInTheDocument();
        expect(queryByText('Total de Espectadores:')).not.toBeInTheDocument();
        expect(queryByText('Total de Receita:')).not.toBeInTheDocument();
    });

    it('handles empty bookings array correctly', () => {
        const { queryByText } = render(<SessionsTables sessions={sessions} bookings={[]} />);
        expect(queryByText('Sessão')).not.toBeInTheDocument();
        expect(queryByText('Total de Espectadores:')).not.toBeInTheDocument();
        expect(queryByText('Total de Receita:')).not.toBeInTheDocument();
    });

    it('renders correct column headers with expected order', () => {
        const { container } = render(<SessionsTables sessions={[sessions[0]]} bookings={bookings} />);

        const columnHeaders = ['Nome', 'Assento', 'Valor'];
        const tableHeaders = Array.from(container.querySelectorAll('thead th')).map(th => th.textContent.trim());

        expect(tableHeaders).toEqual(columnHeaders);

    });

});