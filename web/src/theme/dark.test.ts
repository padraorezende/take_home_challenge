import { describe, expect, it } from "vitest";
import { darkTheme } from "./dark";

describe('Dark Theme Test', () => {
    it('should have dark mode enabled', () => {
        expect(darkTheme.palette.mode).toBe('dark');
    });

    it('should have primary color set correctly', () => {
        expect(darkTheme.palette.primary.main).toBe('#004EE4');
    });

    it('should have default background color set correctly', () => {
        expect(darkTheme.palette.background.default).toBe('#131313');
    });

    it('should have paper background color set correctly', () => {
        expect(darkTheme.palette.background.paper).toBe('#252525');
    });
});