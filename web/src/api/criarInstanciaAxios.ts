import axios, { AxiosInstance } from "axios"
import * as R from 'ramda'
import { ApiModelConfig } from "../types/api/ApiModelConfig"
import { store } from "../redux/store"
import { NOTIFICACAO_USUARIO } from "../redux/actions/notificacaoUsuario.actions"
import { NotificacaoUsuarioAction } from "../redux/reducers/notificacaoUsuario.reducer"

export const criarInstanciaAxios = (config: Partial<ApiModelConfig>, utilizarApiExterna?: boolean): AxiosInstance => {
    const apiLocal = axios.create({
        baseURL: `${config.baseUrlLocal}/${config.modelPluralName}`,
        transformRequest: (data) => {
            return JSON.stringify(data)
        },
        headers: {
            'Content-Type': 'application/json'
        },
        timeout: 60 * 1000
    })
    
    const apiMovieDB = axios.create({
        baseURL: `${config.baseUrlExterna}/${config.modelName}`,
        transformRequest: (data, headers) => {

            headers["Authorization"] = headers["Authorization"] ?? `Bearer ${import.meta.env.VITE_TOKEN_API_THEMOVIEDB}`
            return JSON.stringify(data)
        },
        headers: {
            'Content-Type': 'application/json'
        },
        timeout: 60 * 1000
    })

    const api = utilizarApiExterna ? apiMovieDB : apiLocal


    api.interceptors.response.use(response => response, error => {

        const ehErroDeTimeout = () => R.includes("timeout of", error.message) && R.includes("exceeded", error.message)

        const ehErroDeConexaoDeRede = () => error.message == "Network Error"

        if ((ehErroDeConexaoDeRede() || ehErroDeTimeout())) {

            store.dispatch({ type: NOTIFICACAO_USUARIO.MOSTRAR, status: "error", mensagem: "Falha de conexão de rede." } as NotificacaoUsuarioAction)

        }

        return Promise.reject(error)

    })

    return api
}
