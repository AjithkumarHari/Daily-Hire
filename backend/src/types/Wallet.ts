export interface Wallet {
    _id?: string,
    userId: string,
    balance: number,
    transactions?: Transaction[],
}
export interface Transaction {
    amount: number,
    time: Date,
    type: string,
    message: string,
}