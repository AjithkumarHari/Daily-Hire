export interface Worker {
    _id?: string,
    name: string,
    phone: number,
    email: string,
    password: string | any,
    age: number,
    work: string,
    experience: string,
    gender: string,
    wage_for_day: number,
    wage_for_hour: number,
    profile_img?: string
}