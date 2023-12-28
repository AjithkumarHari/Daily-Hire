import express, { Application } from "express";
import http from "http";
import socketIoConfig from "./framework/server/socket.io";
import serverConfig from "./framework/server/server";
import expressConfig from "./framework/server/express";
import connectDB from "./framework/database/connection";
import routes from "./framework/server/routes"

const app:Application = express();
const server =  http.createServer(app);

// socket.io configuration
socketIoConfig(server);

// express.js configuration (middlewares etc.)
expressConfig(app);

// server configuration and start
serverConfig(server).startServer();

// connect to datbase
connectDB() 

// router configuration
routes(app)

// Expose app
export default app;