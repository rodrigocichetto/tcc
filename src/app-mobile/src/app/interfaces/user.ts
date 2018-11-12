export interface User {
    name: string,
    username: string,
    password: string,
    mail: string,
    city: {
        id: number,
        nome?: string,
        uf?: string
    }
}