import { AxiosInstance } from "axios"
import { criarInstanciaAxios } from "./criarInstanciaAxios"
import { ApiModelConfig } from "../types/api/ApiModelConfig"
import { Booking } from "../types/Booking"


export class BookingApi {
    protected api: AxiosInstance

    public constructor(config: Partial<ApiModelConfig>) {
        this.api = criarInstanciaAxios(config)
    }

    async searchMovieSessionBooking(filmId: string, session: string): Promise<Booking[]> {
        const response = await this.api.get(``, {
            params: {
                filmId,
                session
            }
        })
        return response.data
    }

    async searchMovieBooking(filmId: string): Promise<Booking[]> {
        const response = await this.api.get(``, {
            params: {
                filmId,
            }
        })
        return response.data
    }

    public async updateBookings(payload: Partial<Booking>) {
        const response = await this.api.post(``, payload)
        return response.data
    }
}