import { HttpStatus } from "../../../types/HttpStatus";
import AppError from "../../../util/appError";
import { ReviewRepository } from "../../repository/reviewDbRepository";

export const findByWorker = async (
    workerId: string,
    reviewRepository: ReturnType<ReviewRepository>) => {
    try {

        return await reviewRepository.getReviewByWorker(workerId);
        
    } catch (AppError) {
        return AppError;
    }
} 