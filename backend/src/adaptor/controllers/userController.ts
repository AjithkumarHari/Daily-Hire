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

    const getUser = async (req : Request, res : Response) =>{

        const userId = req.params.id
        findById(userId, DbRepositoryUser)
        .then((user)=>res.json(user))
    
    }

    const addUser = async (req : Request , res : Response) => {
        
        const user:{name:string,email:string,password:string} = req.body
        await addNewUser(user, DbRepositoryUser)
        .then((result : object) => res.json(result))

    }

    const sample = (req: Request,res: Response) => {
        res.send("Success")
    };
    


    return {
        sample,
        getUser,
        addUser
    };
};

export default userController;

