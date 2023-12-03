import { WalletDbRepositoryMongoDB } from "../../framework/database/repository/walletDbRepository";
import { Transaction, Wallet } from "../../types/Wallet";

export const walletDbRepository = (repository: ReturnType<WalletDbRepositoryMongoDB>) =>{

    const getWalletByUser = async (userId: string) => await repository.getWalletByUser(userId);

    const createWallet = async (wallet: Wallet) => await repository.createWallet(wallet);   

    const updateWallet = async (wallet: Wallet,transaction: Transaction) => await repository.updateWallet(wallet, transaction);

    return {
        getWalletByUser,
        createWallet,
        updateWallet,
    }

}

export type WalletRepository = typeof walletDbRepository; 