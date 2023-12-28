import { Server } from "http";
import { Server as SocketIOServer } from "socket.io";
import configKeys from "../../config";

const socketIoConfig = (server : Server) => {
    const io = new SocketIOServer(server, {
        cors: {
            origin: configKeys.ORIGIN_PORT,
        }
    });
    
    io.on('connection', (socket) => {
        socket.on('chat message', (msg) => { io.emit('chat message', msg); });
        socket.on('typing', (data) => { io.emit('typing', data) });
        socket.on('stop typing', (data) => { io.emit('stop typing', data); });
        socket.on('read', (data) => { io.emit('read', data); });
        socket.on('unread', (data) => { io.emit('read', data); });
    });
    
}

export default socketIoConfig;