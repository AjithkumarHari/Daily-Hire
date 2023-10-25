import { Request, Response } from "express";

const userController = () => {
    const sample = (req: Request,res: Response) => {
        res.send("Success")
    };
    return {
        sample
    };
};

export default userController;