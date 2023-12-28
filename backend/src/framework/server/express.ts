import express ,{ Application } from "express";
import cors from 'cors';
import configKeys from "../../config";

const expressConfig = (app : Application) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true}));
    app.use(cors({origin: configKeys.ORIGIN_PORT}));
}

export default expressConfig;