import { describe, expect, it, vi } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import { Seats } from "./Seats";

describe('Seats Component Test', () => {
    it('renders correctly', () => {
        const lockSeats = [];
        const selectedSeats = [];
        const toogleSeatClick = vi.fn();
        
        const { container } = render(
            <Seats lockSeats={lockSeats} selectedSeats={selectedSeats} toogleSeatClick={toogleSeatClick} />
        );
        
        expect(container.querySelector('.MuiGrid-root')).toBeInTheDocument();
    });

    it('handles seat click correctly', () => {
        const lockSeats = [];
        const selectedSeats = [];
        const toogleSeatClick = vi.fn();

        const { getByTitle } = render(
            <Seats lockSeats={lockSeats} selectedSeats={selectedSeats} toogleSeatClick={toogleSeatClick} />
        );

        const seatButton = getByTitle('A1');

        fireEvent.click(seatButton);


        expect(toogleSeatClick).toHaveBeenCalledWith('A1');
    });

    it('disables locked seats', () => {
        const lockSeats = ['A1', 'B3'];
        const selectedSeats = [];
        const toogleSeatClick = vi.fn();

        const { getByTitle } = render(
            <Seats lockSeats={lockSeats} selectedSeats={selectedSeats} toogleSeatClick={toogleSeatClick} />
        );

        const lockedSeatButton = getByTitle('A1');
        const unlockedSeatButton = getByTitle('C5');

        expect(lockedSeatButton).toBeDisabled();
        expect(unlockedSeatButton).not.toBeDisabled();
    });

    it('renders selected seats correctly', () => {
        const lockSeats = [];
        const selectedSeats = ['A1', 'B3'];
        const toogleSeatClick = vi.fn();

        const { getByTitle } = render(
            <Seats lockSeats={lockSeats} selectedSeats={selectedSeats} toogleSeatClick={toogleSeatClick} />
        );

        const seatButtonA1 = getByTitle('A1');
        const seatButtonB3 = getByTitle('B3');

        expect(seatButtonA1).toBeInTheDocument();
        expect(seatButtonB3).toBeInTheDocument();
        const chairIconA1 = seatButtonA1.querySelector('svg');
        const chairIconB3 = seatButtonB3.querySelector('svg');
        expect(chairIconA1).toBeInTheDocument();
        expect(chairIconB3).toBeInTheDocument();
    });
});