import { Review } from "../../../types/Review";
import REVIEW from "../models/reviewModel";

export const reviewDbRepositoryMongoDB = () => {

    const getReviewByWorker = async (workerId: string) => {
        return await REVIEW.find({ workerId: workerId , isHidden: false });
    }
    
    const addReview = async (review: Review) => await REVIEW.create(review);

    const getAllReview = async () => await REVIEW.find();

    const reviewListUnlist = async (_id: string, newStatus: boolean) => {
        return await REVIEW.updateOne({_id}, {$set:{isHidden: newStatus}});
    }

    const getReviewById = async (id : string) => await REVIEW.findById(id);

    return {
        addReview,
        getReviewByWorker,
        getAllReview,
        reviewListUnlist,
        getReviewById,
    }
}

export type ReviewDbRepositoryMongoDB = typeof reviewDbRepositoryMongoDB;