import { Request , Response} from "express";
import { UserDbInterface } from "../../application/repository/userDbRepository";
import { UserRepositoryMongoDB } from "../../framework/database/repository/userDbRepository";
import { findById } from "../../application/useCase/user/findById";
import { addNewUser } from "../../application/useCase/user/add";

const userController = ( 
    userDbRepository : UserDbInterface,
    userDbRepositoryImp : UserRepositoryMongoDB
    ) => {
        
    const DbRepositoryUser = userDbRepository(userDbRepositoryImp())





    const sample = (req: Request,res: Response) => {
        res.send("Success")
    };
    


    return {
        sample,
    };
};

export default userController;

