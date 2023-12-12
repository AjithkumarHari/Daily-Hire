import express, { Application } from "express";
import http from "http";
import serverConfig from "./framework/server/server";
import expressConfig from "./framework/server/express";
import connectDB from "./framework/database/connection";
import routes from "./framework/server/routes"
import { Server } from "socket.io";
import configKeys from "./config";

const app:Application = express();
const server =  http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: ['http://localhost:4200'],
    }
  });


io.on('connection', (socket) => {
    socket.on('chat message', (msg) => { io.emit('chat message', msg); });
    socket.on('typing', (data) => { io.emit('typing', data) });
    socket.on('stop typing', (data) => { io.emit('stop typing', data); });
    socket.on('read', (data) => { io.emit('read', data); });
    socket.on('unread', (data) => { io.emit('read', data); });
});

// express.js configuration (middlewares etc.)
expressConfig(app);

// server configuration and start
serverConfig(server).startServer();

// connect to datbase
connectDB() 

routes(app)

// Expose app
export default app;