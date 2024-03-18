import { describe, expect, it } from "vitest";
import { tryGetFriendlyMessage } from "../tryGetFriendlyMessage";

describe('tryGetFriendlyMessage Function Test', () => {
    it('Should return friendly message when response data exists', () => {
        const erro = {
            response: {
                data: {
                    codigoErro: 404,
                    mensagem: 'Not Found'
                }
            }
        };
        const expected = '404 - Not Found';
        const received = tryGetFriendlyMessage(erro);
        expect(received).toEqual(expected);
    });

    it('Should return "Erro desconhecido." when response data is empty', () => {
        const erro = {};
        const expected = 'Erro desconhecido.';
        const received = tryGetFriendlyMessage(erro);
        expect(received).toEqual(expected);
    });

    it('Should return "Erro desconhecido." when response data is null', () => {
        const erro = {
            response: {
                data: null
            }
        };
        const expected = 'Erro desconhecido.';
        const received = tryGetFriendlyMessage(erro);
        expect(received).toEqual(expected);
    });

    it('Should return "Erro desconhecido." when response data is empty string', () => {
        const erro = {
            response: {
                data: {
                    codigoErro: '',
                    mensagem: ''
                }
            }
        };
        const expected = 'Erro desconhecido.';
        const received = tryGetFriendlyMessage(erro);
        expect(received).toEqual(expected);
    });

    it('Should return "Erro desconhecido." when erro is null', () => {
        const erro = null;
        const expected = 'Erro desconhecido.';
        const received = tryGetFriendlyMessage(erro);
        expect(received).toEqual(expected);
    });

    it('Should return "Erro desconhecido." when erro is undefined', () => {
        const erro = undefined;
        const expected = 'Erro desconhecido.';
        const received = tryGetFriendlyMessage(erro);
        expect(received).toEqual(expected);
    });
});
