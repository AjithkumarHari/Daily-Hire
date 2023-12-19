import { HttpStatus } from "../../../types/HttpStatus";
import AppError from "../../../util/appError";
import { ComplaintRepository } from "../../repository/complaintDbRepository";

export const findAllComplaints = async (
    complaintRepository: ReturnType<ComplaintRepository>
) => {
    try{
        const result = await complaintRepository.getAllComplaints();
        if(!result)
            throw new AppError("complaints not found",HttpStatus.NOT_FOUND);
        return result;
    }catch(AppError){
        return AppError;
    }   
}