import { Application } from "express";
import userRouter from "./user";
import authRouter from "./auth";
import adminRouter from "./admin";
import userAuthMiddle from "../middlewares/userAuthMiddleware";

const routes = (app: Application) => {
    app.use('/api/user',userAuthMiddle,userRouter())
    app.use('/api/auth',authRouter())
    app.use('/api/admin',adminRouter())
}

export default routes