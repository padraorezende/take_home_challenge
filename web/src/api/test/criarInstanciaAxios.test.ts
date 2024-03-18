import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import MockAdapter from 'axios-mock-adapter';
import axios from "axios";
import { ApiModelConfig } from "../../types/api/ApiModelConfig";
import { criarInstanciaAxios } from "../criarInstanciaAxios";
import { store } from "../../redux/store";
import { NOTIFICACAO_USUARIO } from "../../redux/actions/notificacaoUsuario.actions";

describe("criarInstanciaAxios", () => {
    const mockConfig: Partial<ApiModelConfig> = {
        baseUrlLocal: "http://localhost:3000",
        baseUrlExterna: "https://api.themoviedb.org/3",
        modelName: "movie",
        modelPluralName: "movies"
    };

    let mockAxios: MockAdapter;

    beforeEach(() => {
        mockAxios = new MockAdapter(axios);
    });

    afterEach(() => {
        mockAxios.restore();
    });

    it("should create Axios instance with local base URL if utilizarApiExterna is false", () => {
        const api = criarInstanciaAxios(mockConfig, false);

        expect(api.defaults.baseURL).toBe("http://localhost:3000/movies");
    });

    it("should create Axios instance with external base URL if utilizarApiExterna is true", () => {
        const api = criarInstanciaAxios(mockConfig, true);

        expect(api.defaults.baseURL).toBe("https://api.themoviedb.org/3/movie");
    });

    it("should intercept network errors and dispatch error notification action", async () => {
        const api = criarInstanciaAxios(mockConfig, false);
        const spyDispatch = vi.spyOn(store, "dispatch");

        mockAxios.onGet("/movies").networkError();

        try {
            await api.get("/movies");
        } catch (error) {
            // Catch the error
        }

        expect(spyDispatch).toHaveBeenCalledWith({
            type: NOTIFICACAO_USUARIO.MOSTRAR,
            status: "error",
            mensagem: "Falha de conexão de rede."
        });
    });

    it("should intercept timeout errors and dispatch error notification action", async () => {
        const api = criarInstanciaAxios(mockConfig, false);
        const spyDispatch = vi.spyOn(store, "dispatch");

        mockAxios.onGet("/movies").timeout();

        try {
            await api.get("/movies");
        } catch (error) {
            // Catch the error
        }

        expect(spyDispatch).toHaveBeenCalledWith({
            type: NOTIFICACAO_USUARIO.MOSTRAR,
            status: "error",
            mensagem: "Falha de conexão de rede."
        });
    });

    it("should transform request data to JSON string", async () => {
        const api = criarInstanciaAxios(mockConfig);
        const requestData = { key: "value" };

        mockAxios.onPost("/movies").reply(config => {
            expect(config.data).toEqual(JSON.stringify(requestData));
            return [200, {}];
        });

        await api.post("/movies", requestData);
    });

    it("should dispatch error notification action for network errors", async () => {
        const api = criarInstanciaAxios(mockConfig, false);
        const spyDispatch = vi.spyOn(store, "dispatch");

        mockAxios.onGet("/movies").networkError();

        try {
            await api.get("/movies");
        } catch (error) {
            // Catch the error
        }

        expect(spyDispatch).toHaveBeenCalledWith({
            type: NOTIFICACAO_USUARIO.MOSTRAR,
            status: "error",
            mensagem: "Falha de conexão de rede."
        });
    });

    it("should dispatch error notification action for timeout errors", async () => {
        const api = criarInstanciaAxios(mockConfig, false);
        const spyDispatch = vi.spyOn(store, "dispatch");

        mockAxios.onGet("/movies").timeout();

        try {
            await api.get("/movies");
        } catch (error) {
            // Catch the error
        }

        expect(spyDispatch).toHaveBeenCalledWith({
            type: NOTIFICACAO_USUARIO.MOSTRAR,
            status: "error",
            mensagem: "Falha de conexão de rede."
        });
    });
});
