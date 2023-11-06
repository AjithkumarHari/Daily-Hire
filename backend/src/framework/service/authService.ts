import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import configKeys from "../../config";

export const authService  = () => {
    const encryptPassword = async (password: string) => {
        const salt = await bcryptjs.genSalt(10);
        return await bcryptjs.hash(password,salt);
    }

    const comparePassword = async (password: string, hashedPassword: string) => {
        return await bcryptjs.compare(password, hashedPassword);
    }

    const generateToken = (payload: string) => {
        return jwt.sign({payload},configKeys.JWT_SECRET_KEY,{expiresIn:"1d"});
    }

    const verifyToken = (token: string) => {
        return jwt.verify(token, configKeys.JWT_SECRET_KEY);
    }
    
    return {
        encryptPassword,
        comparePassword,
        generateToken,
        verifyToken
    }
}

export type AuthService = typeof authService;