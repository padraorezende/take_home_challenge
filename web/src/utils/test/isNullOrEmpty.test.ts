import { describe, expect, it } from "vitest";
import { isNullOrEmpty } from "../isNullOrEmpty";

describe('isNullOrEmpty Function Test', () => {
    it('Should return true for a null value', () => {
        const value = null;
        expect(isNullOrEmpty(value)).toEqual(true);
    });

    it('Should return true for an undefined value', () => {
        const value = undefined;
        expect(isNullOrEmpty(value)).toEqual(true);
    });

    it('Should return true for an empty string', () => {
        const value = '';
        expect(isNullOrEmpty(value)).toEqual(true);
    });

    it('Should return true for an empty array', () => {
        const value = [];
        expect(isNullOrEmpty(value)).toEqual(true);
    });

    it('Should return true for an empty object', () => {
        const value = {};
        expect(isNullOrEmpty(value)).toEqual(true);
    });

    it('Should return false for a non-empty string', () => {
        const value = 'Hello';
        expect(isNullOrEmpty(value)).toEqual(false);
    });

    it('Should return false for a non-empty array', () => {
        const value = [1, 2, 3];
        expect(isNullOrEmpty(value)).toEqual(false);
    });

    it('Should return false for a non-empty object', () => {
        const value = { key: "value" };
        expect(isNullOrEmpty(value)).toEqual(false);
    });

    it('Should return false for a non-null and non-empty number', () => {
        const value = 42;
        expect(isNullOrEmpty(value)).toEqual(false);
    });

    it('Should return false for a non-null and non-empty boolean', () => {
        const value = true;
        expect(isNullOrEmpty(value)).toEqual(false);
    });
});
