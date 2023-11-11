import { User } from "./User";

export interface Res {
    status: string,
    message?: string,
    token?: string,
    user?: User,
    erroCode?: number

}