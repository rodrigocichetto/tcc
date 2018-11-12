export interface Irrigation {
    _id?: string,
    status: boolean,
    name: string,
    address: string,
    cep: string,
    city: {
        id: number,
        nome?: string,
        uf?: string
    }
}