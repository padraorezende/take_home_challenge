import { describe, expect, it, vi } from "vitest";
import { FormCheckout } from "./FormCheckout";
import { fireEvent, render, waitFor } from "@testing-library/react";

describe('FormCheckout Component Test', () => {
    it('renders correctly', () => {
        const onSaverMock = vi.fn();
        const { getByLabelText, getByText } = render(
            <FormCheckout bookingSubmit={{}} onSave={onSaverMock} />
        );

        const nameInput = getByLabelText('Nome');
        const confirmButton = getByText('Confirmar');

        expect(nameInput).toBeInTheDocument();
        expect(confirmButton).toBeInTheDocument();
    });

    it('call the onSave function with the provided name when submitting the form', async () => {
        const onSaveMock = vi.fn();
        const { getByText } = render(
            <FormCheckout bookingSubmit={{ name: 'John Doe' }} onSave={onSaveMock} />
        );

        const confirmButton = getByText('Confirmar');

        fireEvent.click(confirmButton);

        await waitFor(() => {
            expect(onSaveMock).toHaveBeenCalledWith('John Doe');
        });
    });

    it('should call the onSave function with the provided name when submitting the form', async () => {
        const onSaveMock = vi.fn();
        const { getByLabelText, getByText } = render(
            <FormCheckout bookingSubmit={{ name: 'John Doe' }} onSave={onSaveMock} />
        );

        const nameInput = getByLabelText('Nome');
        fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });

        const confirmButton = getByText('Confirmar');
        fireEvent.click(confirmButton);

        await waitFor(() => {
            expect(onSaveMock).toHaveBeenCalledWith('Jane Doe');
        });
    });

    it('should call the onSave function with the provided name when submitting the form', async () => {
        const onSaveMock = vi.fn();
        const { getByLabelText, getByText, queryByText } = render(
            <FormCheckout bookingSubmit={{ name: 'John Doe' }} onSave={onSaveMock} />
        );

        const nameInput = getByLabelText('Nome');
        fireEvent.change(nameInput, { target: { value: '' } });

        const confirmButton = getByText('Confirmar');
        fireEvent.click(confirmButton);

        await waitFor(() => {
            expect(queryByText('Obrigatório informar um Nome!')).toBeInTheDocument();
            expect(onSaveMock).not.toHaveBeenCalled();
        });
    });

    it('should call the onSave function with the provided name when submitting the form', async () => {
        const onSaveMock = vi.fn();
        const { getByLabelText, getByText, queryByText } = render(
            <FormCheckout bookingSubmit={{ name: 'John Doe' }} onSave={onSaveMock} />
        );

        const nameInput = getByLabelText('Nome');
        fireEvent.change(nameInput, { target: { value: null } });

        const confirmButton = getByText('Confirmar');
        fireEvent.click(confirmButton);

        await waitFor(() => {
            expect(queryByText('Obrigatório informar um Nome!')).toBeInTheDocument();
            expect(onSaveMock).not.toHaveBeenCalled(); 
        });
    });
});