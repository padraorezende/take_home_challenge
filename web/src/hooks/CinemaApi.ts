import { Api } from "../api/Api"

export const baseUrlLocal = 'http://localhost:3000'
export const baseUrlExterna = 'https://api.themoviedb.org/3'

const cinemaApi: Api = new Api({
    baseUrlLocal,
    baseUrlExterna
})

export const useCinemaApi = () => {
    return cinemaApi
}