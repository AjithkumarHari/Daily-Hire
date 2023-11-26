import { ReviewDbRepositoryMongoDB } from "../../framework/database/repository/reviewDbrepository";
import { Review } from "../../types/Review";

export const reviewDbRepository = (repository: ReturnType<ReviewDbRepositoryMongoDB>) => {

    const addReview = async (review: Review) => await repository.addReview(review);

    const getReviewByWorker = async (workerId: string) => await repository.getReviewByWorker(workerId);

    const getAllReview = async () => await repository.getAllReview();

    return {
        addReview,
        getReviewByWorker,
        getAllReview,
    }
}

export type ReviewRepository = typeof reviewDbRepository;