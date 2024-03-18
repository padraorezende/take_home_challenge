import { fireEvent, render, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CheckoutPage } from "./CheckoutPage";

const mockProps = {
    selectedFilm: {
        id: "1",
        name: "Titanic",
        sinopse: "Um romance trágico floresce entre um passageiro pobre e uma aristocrata a bordo do \"inafundável\" RMS Titanic, enfrentando a catástrofe iminente.",
        url: "https://image.tmdb.org/t/p/original/vpsvHLkoeKUjceIMeNSqCp3xEyY.jpg",
        sessions: [{ session: "15:00", value: 10 }, { session: "17:00", value: 10 }, { session: "19:30", value: 15 }]
    },
    selectedSession: { session: "15:00", value: 10 },
    bookingSeats: ['A1', 'B2'],
    selectedSeats: ['A1', 'B2'],
    onSelectedSession: vi.fn(),
    onToogleSeatClick: vi.fn(),
    onHandleBookingSubmit: vi.fn()
};

describe('Checkout Page Test', () => {
    it('rrenders correctly', () => {
        const { getByText, queryByLabelText } = render(<CheckoutPage {...mockProps} />);

        expect(getByText(mockProps.selectedFilm.name)).toBeInTheDocument();
        expect(getByText(mockProps.selectedFilm.sinopse)).toBeInTheDocument();
        expect(getByText(mockProps.selectedSession.session)).toBeInTheDocument();
        expect(getByText('Assento A1')).toBeInTheDocument();
        expect(getByText('Assento B2')).toBeInTheDocument();
        const cartSection = queryByLabelText('Carrinho');
        expect(cartSection).not.toBeInTheDocument();
    });

    it('does not call onHandleBookingSubmit when form is submitted without name', async () => {
        const onHandleBookingSubmitMock = vi.fn();
        const { queryByText, getByText } = render(
            <CheckoutPage {...mockProps} onHandleBookingSubmit={onHandleBookingSubmitMock} />
        );

        const confirmButton = getByText('Confirmar');
        fireEvent.click(confirmButton);

        await waitFor(() => {
            expect(queryByText('Obrigatório informar um Nome!')).toBeInTheDocument();
            expect(onHandleBookingSubmitMock).not.toHaveBeenCalled();
        });
    });

    it('does not call onHandleBookingSubmit when form is submitted with empty name', async () => {
        const onHandleBookingSubmitMock = vi.fn();
        const { queryByText, getByText, getByLabelText } = render(
            <CheckoutPage {...mockProps} onHandleBookingSubmit={onHandleBookingSubmitMock} />
        );

        const nameInput = getByLabelText('Nome');
        fireEvent.change(nameInput, { target: { value: '' } });

        const confirmButton = getByText('Confirmar');
        fireEvent.click(confirmButton);

        await waitFor(() => {
            expect(queryByText('Obrigatório informar um Nome!')).toBeInTheDocument();
            expect(onHandleBookingSubmitMock).not.toHaveBeenCalled();
        });
    });

    it('calls onHandleBookingSubmit when form is submitted with valid name', async () => {
        const onHandleBookingSubmitMock = vi.fn();
        const { getByText, getByLabelText } = render(
            <CheckoutPage {...mockProps} onHandleBookingSubmit={onHandleBookingSubmitMock} />
        );

        const nameInput = getByLabelText('Nome');
        fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });

        const confirmButton = getByText('Confirmar');
        fireEvent.click(confirmButton);

        await waitFor(() => {
            expect(onHandleBookingSubmitMock).toHaveBeenCalledWith('Jane Doe');
        });
    });

    it('does not display the cart section if no seats are selected', () => {
        const { queryByLabelText } = render(<CheckoutPage {...mockProps} selectedSeats={[]} />);
        const cartSection = queryByLabelText('Carrinho');
        expect(cartSection).not.toBeInTheDocument();
    });

    it('updates selected session when a session chip is clicked', () => {
        const onSelectedSessionMock = vi.fn();
        const { getByText } = render(
            <CheckoutPage {...mockProps} onSelectedSession={onSelectedSessionMock} />
        );
        const sessionChip = getByText(mockProps.selectedFilm.sessions[1].session);
        fireEvent.click(sessionChip);
        expect(onSelectedSessionMock).toHaveBeenCalledWith(mockProps.selectedFilm.sessions[1]);
    });


});