import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Menu } from "./Menu";


describe("Menu Component test", () => {

    it('renders without crashing', () => {
        const mockProps = {
            open: true,
            onMenuFilms: vi.fn(),
            onMenuNewMovies: vi.fn(),
            onMenuManagement: vi.fn(),
            onClose: vi.fn(),
        };

        render(<Menu {...mockProps} />);
    });

    it('renders menu items correctly', () => {
        const mockProps = {
            open: true,
            onMenuFilms: vi.fn(),
            onMenuNewMovies: vi.fn(),
            onMenuManagement: vi.fn(),
            onClose: vi.fn(),
        };

        const { getByText, getByAltText } = render(<Menu {...mockProps} />);

        expect(getByText('Novos Lançamentos')).toBeInTheDocument();
        expect(getByText('Filmes')).toBeInTheDocument();
        expect(getByText('Gerênciamento')).toBeInTheDocument();
        expect(getByAltText('CineMark')).toBeInTheDocument();
    });

    it('calls correct callback function when menu item is clicked', () => {
        const mockProps = {
            open: true,
            onMenuFilms: vi.fn(),
            onMenuNewMovies: vi.fn(),
            onMenuManagement: vi.fn(),
            onClose: vi.fn(),
        };

        const { getByText } = render(<Menu {...mockProps} />);

        fireEvent.click(getByText('Novos Lançamentos'));
        expect(mockProps.onMenuNewMovies).toHaveBeenCalled();

        fireEvent.click(getByText('Filmes'));
        expect(mockProps.onMenuFilms).toHaveBeenCalled();

        fireEvent.click(getByText('Gerênciamento'));
        expect(mockProps.onMenuManagement).toHaveBeenCalled();
    });

    it('does not render menu items when closed', () => {
        const mockProps = {
            open: false,
            onMenuFilms: vi.fn(),
            onMenuNewMovies: vi.fn(),
            onMenuManagement: vi.fn(),
            onClose: vi.fn(),
        };

        const { queryByText } = render(<Menu {...mockProps} />);

        expect(queryByText('Novos Lançamentos')).toBeNull();
        expect(queryByText('Filmes')).toBeNull();
        expect(queryByText('Gerênciamento')).toBeNull();
    });

});