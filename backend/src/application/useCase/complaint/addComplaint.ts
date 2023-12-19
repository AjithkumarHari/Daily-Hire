import { Complaint } from "../../../types/Complaint";
import { ComplaintRepository } from "../../repository/complaintDbRepository";

export const addComplaint = async (
    complaint: Complaint,
    complaintRepository: ReturnType<ComplaintRepository>
) => {
    try{
        await complaintRepository.addComplaint(complaint);
        return {"status":"success"}
    }catch(error){
        return error;
    }
}