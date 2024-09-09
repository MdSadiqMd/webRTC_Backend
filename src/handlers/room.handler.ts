import { Socket } from 'socket.io';
import { v4 as UUIDv4 } from 'uuid';

import { logger, serverConfig } from '../config';
import { IRoomParams } from '../types/IRoomParams.types';

const rooms: Record<string, string[]> = {};

const roomHandler = (socket: Socket) => {
    const createRoom = () => {
        const roomId = UUIDv4();
        socket.join(roomId);
        rooms[roomId] = [];

        socket.emit(serverConfig.ROOM_SOCKET, { roomId });
        logger.info(`Room Created withId: ${roomId}`);
    };

    const joinedRoom = ({ roomId, peerId }: IRoomParams) => {
        if (rooms[roomId]) {
            rooms[roomId].push(peerId);
            socket.join(roomId);

            logger.info(`A New User with userId: ${peerId} Joined with SocketId: ${socket.id} in Room: ${roomId}`);

            socket.on(serverConfig.READY_SOCKET, () => {
                socket.to(roomId).emit(serverConfig.USER_JOINED_SOCKET, { peerId });
            });

            socket.emit(serverConfig.USERS_SOCKET, {
                roomId,
                participants: rooms[roomId]
            });
        }
    };

    socket.on(serverConfig.CREATE_SOCKET, createRoom);
    socket.on(serverConfig.JOINED_SOCKET, joinedRoom);
};

export default roomHandler;