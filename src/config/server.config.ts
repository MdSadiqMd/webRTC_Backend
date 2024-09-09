import dotenv from "dotenv";

dotenv.config();

export default {
    PORT: process.env.PORT || 3000,
    ROOM_SOCKET: 'room-created',
    USER_JOINED_SOCKET: 'user-joined',
    READY_SOCKET: 'ready',
    USERS_SOCKET: 'get-users',
    JOINED_SOCKET: 'joined-room',
    CREATE_SOCKET: 'create-room',
};