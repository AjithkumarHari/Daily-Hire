import { Review } from "../../../types/Review";
import { ReviewRepository } from "../../repository/reviewDbRepository";

export const addReview = async (
    review: Review,
    reviewRepository: ReturnType<ReviewRepository>
) => {
    try{
        await reviewRepository.addReview(review);
        return {"status":"success"}
    }catch(error){
        return error;
    }
}