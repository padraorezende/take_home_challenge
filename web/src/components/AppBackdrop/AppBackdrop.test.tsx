import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AppBackdrop } from "./AppBackdrop";

describe('AppBackdrop Component Test', () => {

    it('should render correctly when show is true', () => {
        const { container } = render(<AppBackdrop show={true} />);
        const circularProgress = container.querySelector('.MuiCircularProgress-root');

        expect(circularProgress).toBeInTheDocument();
        
        const computedStyle = window.getComputedStyle(circularProgress);
        expect(computedStyle.visibility).toBe('visible');
    });

    it('should render correctly when show is false', () => {
        const { container } = render(<AppBackdrop show={false} />);
        const circularProgress = container.querySelector('.MuiCircularProgress-root');

        expect(circularProgress).toBeInTheDocument();

        const computedStyle = window.getComputedStyle(circularProgress);
        expect(computedStyle.visibility).toBe('hidden'); 
    });
});