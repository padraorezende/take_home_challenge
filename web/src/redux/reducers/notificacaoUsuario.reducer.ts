import { RootState } from "../RootState"
import { NOTIFICACAO_USUARIO } from "../actions/notificacaoUsuario.actions"

export type NotificacaoUsuarioAction = {type: string} & RootState["notificacaoUsuario"]

export function notificacaoUsuario(notificacaoUsuario: RootState["notificacaoUsuario"] = {status: null, mensagem: "", mostrar: false}, action: NotificacaoUsuarioAction) : RootState["notificacaoUsuario"] {
    switch (action.type) {
        case NOTIFICACAO_USUARIO.MOSTRAR:
            return {
                status: action.status,
                mensagem: action.mensagem,
                mostrar: true
            }
        case NOTIFICACAO_USUARIO.ESCONDER:
            return {
                status: null,
                mensagem: "",
                mostrar: false
            }
        default: return notificacaoUsuario
    }
}