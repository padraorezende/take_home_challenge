import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/RootState"
import { ShowAlert } from "./ShowAlert"
import { NOTIFICACAO_USUARIO } from "../../redux/actions/notificacaoUsuario.actions"

export const ShowAlertContainer = () => {
    const notificacaoUsuario = useSelector((state: RootState) => state.notificacaoUsuario)
    const dispatch = useDispatch()

    return <>
        {notificacaoUsuario != null ? <ShowAlert
            open={notificacaoUsuario.mostrar}
            status={notificacaoUsuario.status}
            message={notificacaoUsuario.mensagem}
            onClose={() => dispatch({ type: NOTIFICACAO_USUARIO.ESCONDER })} /> : <></>}
    </>
}