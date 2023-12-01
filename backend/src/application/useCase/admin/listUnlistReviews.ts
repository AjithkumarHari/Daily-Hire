import { HttpStatus } from "../../../types/HttpStatus";
import AppError from "../../../util/appError";
import { ReviewRepository } from "../../repository/reviewDbRepository";

export const listUnlistReview = async (reviewId: string, reviewRepository: ReturnType<ReviewRepository>) => {
    try {
        const review = await reviewRepository.getReviewById(reviewId); 
        if(review){
            const result: any = await reviewRepository.reviewListUnlist(reviewId, !review.isHidden);
            if(!result)
                throw new AppError("Not Found", HttpStatus.NOT_FOUND);
            return {status: "success", message:"worker status change success"};
        }
        throw new AppError("Worker Not Found", HttpStatus.NOT_FOUND);
    } catch (AppError) {
        return AppError;
    }
}