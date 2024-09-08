import { Socket } from 'socket.io';
import { v4 as UUIDv4 } from 'uuid';

import { logger } from '../config';

const roomHandler = (socket: Socket) => {
    const createRoom = () => {
        const roomId = UUIDv4();
        socket.join(roomId);
        socket.emit('room-created', { roomId });
    };

    const joinRoom = () => {
        logger.info(`New Room Joined`);
    };

    socket.emit('create-room', createRoom);
    socket.emit('join-room', joinRoom);
};

export default roomHandler;