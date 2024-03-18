import { combineReducers } from "redux";
import { notificacaoUsuario } from './notificacaoUsuario.reducer';
import { realizandoProcessamento } from './realizandoProcessamento.reducer';

export const rootReducer = combineReducers({
    notificacaoUsuario,
    realizandoProcessamento
})