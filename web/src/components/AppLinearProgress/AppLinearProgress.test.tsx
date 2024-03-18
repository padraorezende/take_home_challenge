
import { describe, expect, it } from "vitest";
import { AppLinearProgress } from "./AppLinearProgress";
import { render } from "@testing-library/react";
import { AppBackdrop } from "../AppBackdrop/AppBackdrop";

describe('AppLinearProgress Component Test', () => {
    
    it('should render correctly when show is true', () => {
        const { getByRole } = render(<AppLinearProgress show={true} />);
        const linearProgress = getByRole('progressbar');

        expect(linearProgress).toBeInTheDocument(); 

        const computedStyle = window.getComputedStyle(linearProgress);
        expect(computedStyle.getPropertyValue('width')).toBe('100%');
    });

    it('should render correctly when show is false', () => {
        const { queryByRole } = render(<AppBackdrop show={false} />);
        const circularProgress = queryByRole('progressbar');

        expect(circularProgress).not.toBeInTheDocument();
    });

});
