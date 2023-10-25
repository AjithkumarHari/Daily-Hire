import userRouter from "./user";
import { Application } from "express";

const routes = (app: Application) => {
    app.use('/api/user',userRouter())
}

export default routes