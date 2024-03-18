

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TopBar } from "./TopBar";

describe("TopBar Component test", () => {
    it("renders TopBar component correctly", () => {
       
        render(<TopBar onClickMenu={() => {}} />);

        const menuIcon = screen.getByTestId("MenuIcon"); 
        expect(menuIcon).toBeInTheDocument();

        const logo = screen.getByAltText("CineMark");
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute("src", "/src/assets/logo.svg");
    });

    it("triggers onClickMenu callback when menu button is clicked", () => {
        const onClickMenuMock = vi.fn();

        render(<TopBar onClickMenu={onClickMenuMock} />);

        const menuButton = screen.getByTestId("MenuIcon");
        expect(menuButton).toBeInTheDocument();

        fireEvent.click(menuButton);
        expect(onClickMenuMock).toHaveBeenCalled();
    });
});