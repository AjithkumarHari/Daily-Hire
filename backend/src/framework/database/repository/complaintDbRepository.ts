import { Complaint } from "../../../types/Complaint";
import COMPLAINT from "../models/complaintModel";


export const complaintDbRepositoryMongoDB = () => {
 
    const addComplaint = async (complaint: Complaint) => {
        return await COMPLAINT.create(complaint);
    }

    const getAllComplaints = async () => await  COMPLAINT.find();

    return {
        addComplaint,
        getAllComplaints,
    }
}

export type ComplaintDbRepositoryMongoDB = typeof complaintDbRepositoryMongoDB;