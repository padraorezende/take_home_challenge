import { action } from "@storybook/addon-actions"
import { ShowAlert, ShowAlertProps } from "./ShowAlert"

export default {
    title: "Components/ShowAlert",
    component: ShowAlert
}

const propsBase: ShowAlertProps = {
    message: "Dados inválidos",
    open: true,
    status: "error",
    onClose: action("onClose")
}

export const notificacaoUsuarioError = () => <ShowAlert {...propsBase} />

export const notificacaoUsuarioSucess = () => <ShowAlert {...propsBase} status="success" message="Cadastro realizado com sucesso"/>

export const notificacaoUsuarioInfo = () => <ShowAlert {...propsBase} status="info" message="Informe uma data válida"/>

export const notificacaoUsuarioWarning = () => <ShowAlert {...propsBase} status="warning" message="Não foi encontrado nenhum registro"/>