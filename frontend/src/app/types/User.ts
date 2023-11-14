export interface User {
    _id ?: string,
    name: string,
    phone: number,
    email: string,
    password: string,
    isListed?: boolean
}