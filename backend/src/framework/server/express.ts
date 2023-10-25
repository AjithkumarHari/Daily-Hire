import express ,{ Application } from "express";
import configKeys from "../../config";

const expressConfig = (app : Application) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true}));
}

export default expressConfig