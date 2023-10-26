import express from "express";
import userController from "../../../adaptor/controllers/userController";
import { userDbRepository } from "../../../application/repository/userDbRepository"; 
import { userRepositoryMongoDB } from "../../database/repository/userDbRepository";

const userRouter = () => {
    const router = express.Router()
    
    const controller = userController(userDbRepository,userRepositoryMongoDB)

    router.get('/',controller.sample)
    // router.get('/getuser/:id', controller.getUser)
    router.post('/adduser',controller.addUser)
    return router
}

export default userRouter;