export interface Worker{
    _id?:string
    name: string,
    phone: number,
    email: string,
    password: string,
    age: number,
    gender: string,
    work: string,
    experience: number,
    wageForHour: number,
    wageForDay: number,
    location: string,
    profileImg?: string
}