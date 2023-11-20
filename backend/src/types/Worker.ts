export interface Worker {
    _id: string,
    name: string,
    phone: number,
    email: string,
    password: string | any,
    age: number,
    work: string,
    experience: string,
    gender: string,
    wageForDay: number,
    wageForHour: number,
    profileImg?: string,
    location: string,
    isListed?: boolean,
    isActive?: boolean
}