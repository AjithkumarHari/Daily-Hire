import { ReviewRepository } from "../../repository/reviewDbRepository";

export const findAllReviews =async (reviewRepository: ReturnType<ReviewRepository>) => {
   
   return await reviewRepository.getAllReview();
 
}