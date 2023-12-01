export interface Review{
    _id?: string,
    rating: number,
    reviewTitle: string,
    reviewDescription: string
    userName: string,
    userEmail: string,
    workerName: string,
    workerId: string,
    isHidden?: boolean,
}