import { Review } from "../../../types/Review";
import REVIEW from "../models/reviewModel";

export const reviewDbRepositoryMongoDB = () => {

    const getReviewByWorker = async (workerId: string) => {
        return await REVIEW.find({ workerId: workerId , isHidden: false });
    }

    const addReview = async (review: Review) => {
        return REVIEW.create(review);
    }

    return {
        addReview,
        getReviewByWorker,
    }
}

export type ReviewDbRepositoryMongoDB = typeof reviewDbRepositoryMongoDB;