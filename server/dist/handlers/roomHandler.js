/*
Basic Idea:
Here we are going to write some logic so that when a new socket connection is setup, then we can join that socket connection to a particular room.

* In Sockets it's very basic that create a room and inside that room connect various socket connection and then send messages to the all connection.

* peerjs will work like a signaling server.
* And our nodejs server will work as SFU(single forwarding unit), because of this when suppose 5 people join the romm
* then using our node js server we can relay the information to all client.
*/
import { v4 as uuidv4 } from 'uuid';
const roomHandler = (socket) => {
    const createRoom = () => {
        const roomId = uuidv4(); // it will be our unique roomid in which multiple connection will exchange the information.
        console.log('see the roomid', roomId);
        socket.join(roomId); // this socket connection has joined a room, using the roomid.
        socket.emit("room-created", { roomId }); // from backend side we emit a event that a room is created and send the roomId.
        console.log("room created with id", roomId);
    };
    const joinRoom = () => {
        console.log("New room joined");
    };
    // when to call the above two functions 
    // we will call the above two function when the client will emit an event to create and join the room.
    socket.on("create-room", createRoom);
    socket.on("join-room", joinRoom);
};
export default roomHandler;
//# sourceMappingURL=roomHandler.js.map