/*
Basic Idea:
Here we are going to write some logic so that when a new socket connection is setup, then we can join that socket connection to a particular room.

* In Sockets it's very basic that create a room and inside that room connect various socket connection and then send messages to the all connection.

* peerjs will work like a signaling server.
* And our nodejs server will work as SFU(single forwarding unit), because of this when suppose 5 people join the romm
* then using our node js server we can relay the information to all client.
*/

import type { Socket } from "socket.io";
import { v4 as uuidv4 } from 'uuid';
import type IRoomParams from "../interfaces/IRoomParams.js";

 // this object will store the roomid and the peerid of the user who joined that room.
    const rooms: Record<string, string[]> = {};

const roomHandler = (socket: Socket) => {

    const createRoom = () => {
        const roomId = uuidv4(); // it will be our unique roomid in which multiple connection will exchange the information.
        console.log('see the roomid', roomId)
        socket.join(roomId); // this socket connection has joined a room, using the roomid.

        rooms[roomId] = []; // we are creating a new room in our memory db and assigning an empty array to it, because when a user will join the room then we will push the peerid of that user in that array.

        socket.emit("room-created", { roomId }) // from backend side we emit a event that a room is created and send the roomId.
        console.log("room created with id", roomId)
    }

    /* The below function is executed evertime a user(creator or joinee) joins the room  */
    const joinRoom = ({ roomId, peerId }: IRoomParams) => {
        if (rooms[roomId]) {
            // if the given roomId exists in the memory db
            console.log(`New user joined room with id ${roomId} and peerId is ${peerId}`)
            rooms[roomId].push(peerId);
            socket.join(roomId); // make the user join the room with the given roomId.

            // below event is just for logging purpose
            socket.emit("get-users",{
                roomId,
                participants : rooms[roomId]
            })
        }
    }


    // when to call the above two functions 

    // we will call the above two function when the client will emit an event to create and join the room.

    socket.on("create-room", createRoom);
    socket.on("join-room", joinRoom);

}

export default roomHandler;