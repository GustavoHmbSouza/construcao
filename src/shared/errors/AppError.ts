export class AppError {
    public readonly message: string;

    public readonly statusCode: number;

    constructor(mensagem: string, statusCode = 400) {
        this.message = mensagem;
        this.statusCode = statusCode;
    }
}