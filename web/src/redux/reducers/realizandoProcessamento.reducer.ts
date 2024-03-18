import { RootState } from "../RootState"
import { REALIZANDO_PROCESSAMENTO } from "../actions/realizandoProcessamento.actions"

export function realizandoProcessamento(realizandoProcessamento: RootState["realizandoProcessamento"] = "NENHUM", action: {type:string, realizandoCarregamento: RootState["realizandoProcessamento"]}) : RootState["realizandoProcessamento"] {
    switch (action.type) {
        case REALIZANDO_PROCESSAMENTO.ATIVO:
            return "ATIVO"
        case REALIZANDO_PROCESSAMENTO.PASSIVO:
            return "PASSIVO"
        case REALIZANDO_PROCESSAMENTO.NENHUM:
            return "NENHUM"
        default: return realizandoProcessamento
    }
}