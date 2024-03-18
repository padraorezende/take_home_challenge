export type RootState = {
    realizandoProcessamento: "ATIVO" | "PASSIVO" | "NENHUM",
    notificacaoUsuario: {
        status: "error" | "warning" | "success",
        mensagem: string
        mostrar: boolean
    }
}