
interface ICreateFuncionariosTokensDTO {
    funcionario_id: string;
    data_expiracao: Date;
    refresh_token: string;
}

export { ICreateFuncionariosTokensDTO }