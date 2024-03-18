import { AxiosInstance } from "axios"
import { ApiModelConfig } from "../types/api/ApiModelConfig"
import { criarInstanciaAxios } from "./criarInstanciaAxios"
import { TrendingPagination } from "../types/Trending"


export class TrendingApi {
    protected api: AxiosInstance

    public constructor(config: Partial<ApiModelConfig>) {
        this.api = criarInstanciaAxios(config, true)
    }

    async searchTrendingMovies(language: string): Promise<Partial<TrendingPagination>> {
        const response = await this.api.get(`/movie/day`, {
            params: {
                language
            }
        })
        return response.data
    }

}