import { ComplaintDbRepositoryMongoDB } from "../../framework/database/repository/complaintDbRepository";
import { Complaint } from "../../types/Complaint";

export const complaintDbRepository = (repository: ReturnType<ComplaintDbRepositoryMongoDB>) => {

    const addComplaint = async (complaint: Complaint) => await repository.addComplaint(complaint);
   
    const getAllComplaints = async () => await repository.getAllComplaints();

    return {
        addComplaint,
        getAllComplaints,
    }
}

export type ComplaintRepository = typeof complaintDbRepository;