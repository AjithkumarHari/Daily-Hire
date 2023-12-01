import { ReviewDbRepositoryMongoDB } from "../../framework/database/repository/reviewDbrepository";
import { Review } from "../../types/Review";

export const reviewDbRepository = (repository: ReturnType<ReviewDbRepositoryMongoDB>) => {

    const addReview = async (review: Review) => await repository.addReview(review);

    const getReviewByWorker = async (workerId: string) => await repository.getReviewByWorker(workerId);

    const getAllReview = async () => await repository.getAllReview();

    const reviewListUnlist = async (reviewId: string, newStatus: boolean) => await repository.reviewListUnlist(reviewId, newStatus);

    const getReviewById = async (id:string) => await repository.getReviewById(id);

    return {
        addReview,
        getReviewByWorker,
        getAllReview,
        reviewListUnlist,
        getReviewById,
    }
}

export type ReviewRepository = typeof reviewDbRepository;