import { Application } from "express";
import userRouter from "./user";
import authRouter from "./auth";

const routes = (app: Application) => {
    app.use('/api/user',userRouter())
    app.use('/api/auth',authRouter())
}

export default routes