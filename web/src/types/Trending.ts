
export interface TrendingPagination {
    page: number
    results: Trending[]
    total_pages: number
    total_results: number
}

export interface Trending {
    adult: boolean
    backdrop_path: string
    id: number
    title: string
    original_language: string
    original_title: string
    overview: string
    poster_path: string
    media_type: string
    genre_ids: number[]
    popularity: number
    release_date: string
    video: boolean
    vote_average: number
    vote_count: number
}