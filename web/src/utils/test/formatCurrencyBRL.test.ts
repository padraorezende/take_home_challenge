import { describe, expect, it } from "vitest";
import { formatCurrencyBRL } from "../formatCurrencyBRL";

describe('formatCurrencyBRL Function Test', () => {
    it('Should correctly format the number into BRL currency format', () => {
        const expected = 'R$ 1.234,56';
        const received = formatCurrencyBRL.format(1234.56).replace(/\s+/g, '');
        expect(received).toEqual(expected.replace(/\s+/g, ''));
    });

    it('Should correctly format zero into BRL currency format', () => {
        const expected = 'R$ 0,00';
        const received = formatCurrencyBRL.format(0).replace(/\s+/g, '');
        expect(received).toEqual(expected.replace(/\s+/g, ''));
    });

    it('Should correctly format negative numbers into BRL currency format', () => {
        const expected = '-R$ 1.234,56';
        const received = formatCurrencyBRL.format(-1234.56).replace(/\s+/g, '');
        expect(received).toEqual(expected.replace(/\s+/g, ''));
    });

    it('Should correctly format large numbers into BRL currency format', () => {
        const expected = 'R$ 123.456.789,99';
        const received = formatCurrencyBRL.format(123456789.99).replace(/\s+/g, '');
        expect(received).toEqual(expected.replace(/\s+/g, ''));
    });

    it('Should correctly format decimal numbers less than 1 into BRL currency format', () => {
        const expected = 'R$ 0,99';
        const received = formatCurrencyBRL.format(0.99).replace(/\s+/g, '');
        expect(received).toEqual(expected.replace(/\s+/g, ''));
    });

    it('Should correctly format integer numbers into BRL currency format', () => {
        const expected = 'R$ 5,00';
        const received = formatCurrencyBRL.format(5).replace(/\s+/g, '');
        expect(received).toEqual(expected.replace(/\s+/g, ''));
    });
});
