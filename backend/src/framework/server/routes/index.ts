import { Application } from "express";
import userRouter from "./user";
import authRouter from "./auth";
import adminRouter from "./admin";

const routes = (app: Application) => {
    app.use('/api/user',userRouter())
    app.use('/api/auth',authRouter())
    app.use('/api/admin',adminRouter())
}

export default routes