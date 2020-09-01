declare namespace Express {
    //Agora todas as rotas autenticadas possuem o id do usuário autenticado dentro do request;
    export interface Request {
        user: {
            id: string;
        };
    }
}
