import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { REALIZANDO_PROCESSAMENTO } from "../../redux/actions/realizandoProcessamento.actions"
import { useCinemaApi } from "../../hooks/CinemaApi"
import { NOTIFICACAO_USUARIO } from "../../redux/actions/notificacaoUsuario.actions"
import { tryGetFriendlyMessage } from "../../utils/tryGetFriendlyMessage"
import { NotificacaoUsuarioAction } from "../../redux/reducers/notificacaoUsuario.reducer"
import { NewFilmsPage } from "./NewFilmsPage"
import { TrendingPagination } from "../../types/Trending"


export const NewFilmsPageContainer = () => {
    const dispatch = useDispatch()
    const cinemaApi = useCinemaApi()

    const [trendingPagination, setTrendingPagination] = useState<Partial<TrendingPagination>>({})

    const onSearchTrendingMovies = async () => {
        try {
            dispatch({ type: REALIZANDO_PROCESSAMENTO.ATIVO })
            const movies = await cinemaApi.Trending.searchTrendingMovies("en-US");
            setTrendingPagination(movies)
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
        onSearchTrendingMovies()
    }, [])


    return (
        <>
            <NewFilmsPage trendings={trendingPagination.results} />
        </>
    )
}