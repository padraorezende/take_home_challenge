import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ShowAlert } from "./ShowAlert";

describe("ShowAlert Component test", () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.runOnlyPendingTimers();
        vi.restoreAllMocks()
    })

    it('renders correctly', async () => {
        const onCloseMock = vi.fn();

        await act(() => render(<ShowAlert open={true} message="Same message" status="success" onClose={onCloseMock} />));

        const messageElement = screen.getByText("Same message")
        expect(messageElement).toBeInTheDocument();
        expect(onCloseMock).not.toBeCalled();
        act(() => vi.advanceTimersByTime(6000));
        expect(onCloseMock).toBeCalled();

    });

    it('does not render when the message is empty', () => {
        const { container } = render(<ShowAlert open={true} message="" status="success" />);
    
        expect(container.firstChild).toBeNull();
    });

    it('does not render when the message is null', () => {
        const { container } = render(<ShowAlert open={true} message={null} status="success" />);
    
        expect(container.firstChild).toBeNull();
    });

    it('calls the onClose function correctly when closing the notification', () => {
        const onCloseMock = vi.fn();

        const { getByLabelText } = render(
            <ShowAlert open={true} message="Test message" status="success" onClose={onCloseMock} />
        );
    
        expect(onCloseMock).not.toHaveBeenCalled();
    
        const closeButton = getByLabelText('Close');
        closeButton.click()
    
        expect(onCloseMock).toHaveBeenCalled();
    });
});