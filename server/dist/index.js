import express from 'express';
import http from 'http';
import serverConfig from './config/serverConfig.js';
import { Server } from 'socket.io';
import cors from 'cors';
import roomHandler from './handlers/roomHandler.js';
const app = express();
app.use(cors());
// Create HTTP server
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
io.on('connection', (socket) => {
    console.log(`New user connected: ${socket.id}`);
    roomHandler(socket); //pass the socket connection to roomHandler for roomCreation and join
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});
server.listen(serverConfig.PORT, () => {
    console.log(`Server is running on port ${serverConfig.PORT}`);
});
//# sourceMappingURL=index.js.map