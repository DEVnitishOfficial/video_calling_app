import { useContext } from "react";
import { SocketContext } from "../context/SocketContext.tsx";

const CreateRoom: React.FC = () => {

    const socket = useContext(SocketContext)

    const initRoom = () => {
        if (!socket) {
            console.warn("Socket not ready yet")
            return;
        }
        console.log("initialize room creation", socket.id)
        socket.emit("create-room")
    }

    return(
        <button onClick={initRoom}
        className="btn btn-secondary"
        >
            Start a new meeting in a New Room
        </button>
    )
}

export default CreateRoom;
