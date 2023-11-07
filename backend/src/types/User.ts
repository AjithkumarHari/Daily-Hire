export interface User {
    _id?: string;
    name : string,
    email : string,
    phone ? : number,
    password ?: string,
    isGoogleUser?: boolean
}