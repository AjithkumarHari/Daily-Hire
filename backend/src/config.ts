import dotenv from "dotenv"
dotenv.config();

const configKeys = {
    PORT: process.env.PORT as string,
    ORIGIN_PORT: process.env.ORIGIN_PORT as string,
    MONGODB_URL: process.env.MONGODB_URL as string,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY as string,
    GOOGLE_AUTH_CLIENT_ID: process.env.GOOGLE_AUTH_CLIENT_ID as string,
    GOOGLE_AUTH_CLIENT_SECRET: process.env.GOOGLE_AUTH_CLIENT_SECRET as string,
    GOOGLE_AUTH_REDIRECT_URI: process.env.GOOGLE_AUTH_REDIRECT_URI
}

export default configKeys; 