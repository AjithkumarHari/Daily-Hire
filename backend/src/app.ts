import express, { Application } from "express";
import http from "http";
import serverConfig from "./framework/server/server";
import expressConfig from "./framework/server/express";
import connectDB from "./framework/database/connection";
import routes from "./framework/server/routes"

const app:Application = express();
const server =  http.createServer(app);

// express.js configuration (middlewares etc.)
expressConfig(app);

// server configuration and start
serverConfig(server).startServer();

// connect to datbase
connectDB() 

routes(app)

// Expose app
export default app;