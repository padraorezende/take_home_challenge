import { Session } from "./Session"

export interface Film {
    id: string
    name: string
    sinopse: string
    url: string
    sessions: Session[]
}