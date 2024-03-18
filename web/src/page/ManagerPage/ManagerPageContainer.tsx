import { useEffect, useState } from "react"
import { ManagerPage } from "./ManagerPage"
import { useDispatch } from "react-redux"
import { useCinemaApi } from "../../hooks/CinemaApi"
import { NOTIFICACAO_USUARIO } from "../../redux/actions/notificacaoUsuario.actions"
import { REALIZANDO_PROCESSAMENTO } from "../../redux/actions/realizandoProcessamento.actions"
import { NotificacaoUsuarioAction } from "../../redux/reducers/notificacaoUsuario.reducer"
import { Film } from "../../types/Film"
import { tryGetFriendlyMessage } from "../../utils/tryGetFriendlyMessage"
import { Booking } from "../../types/Booking"

export const ManagerPageContainer = () => {
    const dispatch = useDispatch()
    const cinemaApi = useCinemaApi()
    const [films, setFilms] = useState<Film[]>([]);
    const [selectedFilm, setSelectedFilm] = useState<Partial<Film>>(null)
    const [bookings, setBookings] = useState<Booking[]>([])

    const onSearchFilmList = async () => {
        try {
            dispatch({ type: REALIZANDO_PROCESSAMENTO.ATIVO })
            const films = await cinemaApi.Film.searchFilmList();
            setFilms(films)
        } catch (e) {
            dispatch({
                type: NOTIFICACAO_USUARIO.MOSTRAR,
                status: "error",
                mensagem: tryGetFriendlyMessage(e)
            } as NotificacaoUsuarioAction)
        } finally {
            dispatch({ type: REALIZANDO_PROCESSAMENTO.NENHUM })
        }
    }

    const onSelectedFilm = async (film: Film) => {
        try {
            dispatch({ type: REALIZANDO_PROCESSAMENTO.ATIVO })
            setSelectedFilm(film)
            const response = await cinemaApi.Booking.searchMovieBooking(film.id);
            setBookings(response)
        } catch (e) {
            dispatch({
                type: NOTIFICACAO_USUARIO.MOSTRAR,
                status: "error",
                mensagem: tryGetFriendlyMessage(e)
            } as NotificacaoUsuarioAction)
        } finally {
            dispatch({ type: REALIZANDO_PROCESSAMENTO.NENHUM })
        }
    }

    useEffect(() => {
        onSearchFilmList()
    }, [])

    
    return (
        <>
            <ManagerPage
                films={films}
                bookings={bookings}
                selectedFilm={selectedFilm}
                onSelectedFilm={onSelectedFilm}
            />
        </>
    )
}