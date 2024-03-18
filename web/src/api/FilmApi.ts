import { AxiosInstance } from "axios"
import { criarInstanciaAxios } from "./criarInstanciaAxios"
import { ApiModelConfig } from "../types/api/ApiModelConfig"
import { Film } from "../types/Film"

export class FilmApi {
    protected api: AxiosInstance

    public constructor(config: Partial<ApiModelConfig>) {
        this.api = criarInstanciaAxios(config)
    }

    async searchFilmList(): Promise<Film[]> {
        const response = await this.api.get(``)
        return response.data
    }

    async searchTheFilm(id: string): Promise<Film[]> {
        const response = await this.api.get(``, {
            params: {
                id
            }
        })

        return response.data
    }
}