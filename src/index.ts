import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

import { serverConfig, logger } from './config';
import roomHandler from './handlers/room.handler';

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    logger.info(`New User Connected: ${socket.id}`);
    roomHandler(socket);
    socket.on('disconnect', () => {
        logger.info(`User Disconnected: ${socket.id}`);
    });
});

server.listen(serverConfig.PORT, () => {
    logger.info(`Server is running on PORT: ${serverConfig.PORT}`);
});