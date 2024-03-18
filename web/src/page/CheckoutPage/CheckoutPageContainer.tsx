import { useEffect, useState } from "react";
import { CheckoutPage } from "./CheckoutPage"
import { useDispatch } from "react-redux";
import { useCinemaApi } from "../../hooks/CinemaApi";
import { REALIZANDO_PROCESSAMENTO } from "../../redux/actions/realizandoProcessamento.actions";
import { tryGetFriendlyMessage } from "../../utils/tryGetFriendlyMessage";
import { NOTIFICACAO_USUARIO } from "../../redux/actions/notificacaoUsuario.actions";
import { NotificacaoUsuarioAction } from "../../redux/reducers/notificacaoUsuario.reducer";
import { Film } from "../../types/Film";
import { Session } from "../../types/Session";
import { useNavigate } from "react-router-dom";

export type CheckoutPageContainerProps = {
    idFilm: string
}

export const CheckoutPageContainer = (props: CheckoutPageContainerProps) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cinemaApi = useCinemaApi()
    const [selectedSession, setSelectedSession] = useState<Partial<Session>>({});
    const [selectedFilm, setSelectedFilm] = useState<Partial<Film>>({})
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const [bookingSeats, setBookingSeats] = useState<string[]>([]);

    const onToogleSeatClick = (seat: string) => {
        if(!(selectedSession && selectedSession.session)){
            dispatch({ type: NOTIFICACAO_USUARIO.MOSTRAR, status: "error", mensagem: "Informar sua sessão antes de selecionar seu assento." } as NotificacaoUsuarioAction)
            return
        }
        setSelectedSeats(prev => prev.includes(seat) ? prev.filter(i => i !== seat) : [...prev, seat]);
    }

    const onSearchMovieBooking = async (seat: Session) => {
        try {
            dispatch({ type: REALIZANDO_PROCESSAMENTO.ATIVO })
            
            if (seat && seat.session && selectedFilm?.id) {
                const bookings = await cinemaApi.Booking.searchMovieSessionBooking(selectedFilm.id, seat.session);
                setSelectedSession(seat)
                setBookingSeats(bookings.flatMap(obj => obj.seats))
            }
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

    const onSearchTheFilm = async () => {
        try {
            dispatch({ type: REALIZANDO_PROCESSAMENTO.ATIVO })
            const film = await cinemaApi.Film.searchTheFilm(props.idFilm);
            setSelectedFilm(film[0])
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

    const onHandleBookingSubmit = async (name: string) => {
        try {
            dispatch({ type: REALIZANDO_PROCESSAMENTO.ATIVO })
            if (!name) {
                dispatch({ type: NOTIFICACAO_USUARIO.MOSTRAR, status: "error", mensagem: "Informar o nome da reserva" } as NotificacaoUsuarioAction)
                return;
            }

            const payload = { filmId: selectedFilm.id, session: selectedSession.session, name: name, seats: selectedSeats, value: selectedSession.value * selectedSeats.length };

            await cinemaApi.Booking.updateBookings(payload);

            dispatch({ type: NOTIFICACAO_USUARIO.MOSTRAR, status: "success", mensagem: "Reserva efetuada com sucesso!" } as NotificacaoUsuarioAction)

            navigate(`/`)
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
        onSearchTheFilm();
    }, []); 

    return (
        <CheckoutPage
            selectedFilm={selectedFilm}
            selectedSession={selectedSession}
            bookingSeats={bookingSeats}
            selectedSeats={selectedSeats}
            onSelectedSession={onSearchMovieBooking}
            onToogleSeatClick={onToogleSeatClick}
            onHandleBookingSubmit={onHandleBookingSubmit}

        />
    )
}