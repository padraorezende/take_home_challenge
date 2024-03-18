import { isNotNullOrEmpty } from "./isNotNullOrEmpty"

export const tryGetFriendlyMessage = (erro:any) : string => {
    const tryGetResponseAxios = () => isNotNullOrEmpty(erro?.response?.data?.codigoErro) ? `${erro?.response?.data?.codigoErro} - ${erro?.response?.data?.mensagem}` : null

    console.error(erro)
    
    return tryGetResponseAxios() ?? `Erro desconhecido.`
}