import { Review } from "../../../types/Review";
import REVIEW from "../models/reviewModel";

export const reviewDbRepositoryMongoDB = () => {

    const getReviewByWorker = async (workerId: string) => {
        return await REVIEW.find({ workerId: workerId , isHidden: false });
    }

    const addReview = async (review: Review) => REVIEW.create(review);

    const getAllReview = async () => REVIEW.find();

    return {
        addReview,
        getReviewByWorker,
        getAllReview
    }
}

export type ReviewDbRepositoryMongoDB = typeof reviewDbRepositoryMongoDB;