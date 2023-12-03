import { HttpStatus } from "../../../types/HttpStatus";
import { Transaction, Wallet } from "../../../types/Wallet";
import AppError from "../../../util/appError";
import { WalletRepository } from "../../repository/walletDbRepository";

export const getWallet = async (
        userId: string,
        walletRepository: ReturnType<WalletRepository>
) => {
    try {
        const isWalletExist = await walletRepository.getWalletByUser(userId);
        if(isWalletExist)
            return isWalletExist;
        else
            throw new AppError("wallet Not Found",HttpStatus.UNAUTHORIZED);
        
    } catch (AppError) {
        return AppError;
    }
        
        
}
    
 