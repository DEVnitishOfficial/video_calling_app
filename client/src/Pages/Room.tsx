import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";

const Room: React.FC = () => {

    const { id } = useParams();
    const { socket, user } = useContext(SocketContext);

    useEffect(() => {
        // emitting this event so that either the creator or the joiner can join the same room
        // based on the room id and there is no need to create rooms for each user separately
        if (user) {
            socket.emit("join-room", { roomId: id, peerId: user._id });
        }
    }, [id, user])

    return (
        <div>
            Room : {id}
        </div>
    )
}
export default Room;