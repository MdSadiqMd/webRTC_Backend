import { Socket } from 'socket.io';
import { v4 as UUIDv4 } from 'uuid';

import { logger } from '../config';
import { IRoomParams } from '../types/IRoomParams.types';

const rooms: Record<string, string[]> = {};

const roomHandler = (socket: Socket) => {
    const createRoom = () => {
        const roomId = UUIDv4();
        socket.join(roomId);
        rooms[roomId] = [];

        socket.emit('room-created', { roomId });
        logger.info(`Room Created withId: ${roomId}`);
    };

    const joinedRoom = ({ roomId, peerId }: IRoomParams) => {
        if (rooms[roomId]) {
            rooms[roomId].push(peerId);
            socket.join(roomId);

            logger.info(`A New User with userId: ${peerId} Joined with SocketId: ${socket.id} in Room: ${roomId}`);

            socket.on('ready', () => {
                socket.to(roomId).emit('user-joined', { peerId });
            });
            
            socket.emit('get-users', {
                roomId,
                participants: rooms[roomId]
            });
        }
    };

    socket.on('create-room', createRoom);
    socket.on('joined-room', joinedRoom);
};

export default roomHandler;