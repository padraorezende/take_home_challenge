import { useEffect, useState } from "react";
import { SelectionPage } from "./SelectionPage"
import { useCinemaApi } from "../../hooks/CinemaApi";
import { Film } from "../../types/Film";
import { tryGetFriendlyMessage } from "../../utils/tryGetFriendlyMessage";
import { REALIZANDO_PROCESSAMENTO } from "../../redux/actions/realizandoProcessamento.actions";
import { NOTIFICACAO_USUARIO } from "../../redux/actions/notificacaoUsuario.actions";
import { NotificacaoUsuarioAction } from "../../redux/reducers/notificacaoUsuario.reducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const SelectionContainer = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cinemaApi = useCinemaApi()
    const [films, setFilms] = useState<Film[]>([]);

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

    const onSelectedFilm = (film: Film) => {
        navigate(`/checkout/${film.id}`)
    }

    useEffect(() => {
        onSearchFilmList()
    }, [])

    return (<SelectionPage films={films} onSelectedFilm={onSelectedFilm} />)
}