import { Socket } from 'socket.io';
import { v4 as UUIDv4 } from 'uuid';

import { logger } from '../config';

const roomHandler = (socket: Socket) => {
    const createRoom = () => {
        const roomId = UUIDv4();
        socket.join(roomId);
        socket.emit('room-created', { roomId });
        logger.info(`Room Created withId: ${roomId}`);
    };

    const joinedRoom = ({ roomId }: { roomId: string; }) => {
        logger.info(`A New User Joined with SocketId: ${socket.id} in Room: ${roomId}`);
    };

    socket.on('create-room', createRoom);
    socket.on('joined-room', joinedRoom);
};

export default roomHandler;