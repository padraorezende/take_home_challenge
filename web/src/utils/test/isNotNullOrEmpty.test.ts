import { describe, expect, it } from "vitest";
import { isNotNullOrEmpty } from "../isNotNullOrEmpty";

describe('isNotNullOrEmpty Function Test', () => {
    it('Should return true for a non-null and non-empty value', () => {
        const value = "Hello";
        expect(isNotNullOrEmpty(value)).toEqual(true);
    });

    it('Should return false for a null value', () => {
        const value = null;
        expect(isNotNullOrEmpty(value)).toEqual(false);
    });

    it('Should return false for an empty string', () => {
        const value = "";
        expect(isNotNullOrEmpty(value)).toEqual(false);
    });

    it('Should return false for an empty array', () => {
        const value = [];
        expect(isNotNullOrEmpty(value)).toEqual(false);
    });

    it('Should return false for an empty object', () => {
        const value = {};
        expect(isNotNullOrEmpty(value)).toEqual(false);
    });

    it('Should return true for a non-null and non-empty number', () => {
        const value = 42;
        expect(isNotNullOrEmpty(value)).toEqual(true);
    });

    it('Should return true for a non-null and non-empty boolean', () => {
        const value = true;
        expect(isNotNullOrEmpty(value)).toEqual(true);
    });

    it('Should return true for a non-null and non-empty array', () => {
        const value = [1, 2, 3];
        expect(isNotNullOrEmpty(value)).toEqual(true);
    });

    it('Should return true for a non-null and non-empty object', () => {
        const value = { key: "value" };
        expect(isNotNullOrEmpty(value)).toEqual(true);
    });
});