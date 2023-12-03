import { Transaction, Wallet } from "../../../types/Wallet";
import WALLET from "../models/walletModel";

export const walletDbRepositoryMongoDB = () => {

    const getWalletByUser = async (userId: string) => {
        return await WALLET.findOne({userId});
    }

    const createWallet = async (wallet: Wallet) => {
        return await WALLET.create(wallet)
    }

    const updateWallet = async (wallet: Wallet, transaction: Transaction) => {
        return await WALLET.updateOne(
            { userId: wallet.userId },
            {
                $set: { balance: wallet.balance },
                $push: { 
                    transactions: {
                        $each: [ transaction ],
                        $position: 0
                    } 
                },
            },
            { new: true },
        );
    }
    
    return {
        getWalletByUser,
        createWallet,
        updateWallet,
    } 
}

export type WalletDbRepositoryMongoDB = typeof walletDbRepositoryMongoDB;