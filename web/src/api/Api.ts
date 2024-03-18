import { ApiModelConfig } from "../types/api/ApiModelConfig"
import { BookingApi } from "./BookingApi"
import { FilmApi } from "./FilmApi"
import { TrendingApi } from "./TrendingApi"

export class Api {
    constructor(config: Partial<ApiModelConfig>) {

        this.Film = new FilmApi({ ...config, modelName: "film", modelPluralName: "films" })
        this.Booking = new BookingApi({ ...config, modelName: "booking", modelPluralName: "bookings" })
        this.Trending = new TrendingApi({ ...config, modelName: "trending", modelPluralName: "trendings" })
    }

    public readonly Film: FilmApi
    public readonly Booking: BookingApi
    public readonly Trending: TrendingApi
}