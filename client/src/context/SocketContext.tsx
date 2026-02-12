import SocketIoClient from "socket.io-client";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Peer from "peerjs"
import { v4 as uuidv4 } from 'uuid';


const WEBSOCKET_SERVER = "http://localhost:5500";

 const SocketContext = createContext<any | null>(null);

const socket = SocketIoClient(WEBSOCKET_SERVER, {
    withCredentials: false,
    transports: ["pooling", "websocket"]
});

interface Props {
    children: React.ReactNode
}

 const SocketProvider: React.FC<Props> = ({ children }) => {


    const navigate = useNavigate();

    // state variable to store the userId
    const [user, setUser] = useState<Peer>()
    const [stream, setStream] = useState<MediaStream>()


    const fetchUserFeed = async() => {
      const stream = await navigator.mediaDevices.getUserMedia({video:true, audio:true});
      setStream(stream);
    }

    useEffect(() => {

        const userId = uuidv4();
        const newPeer = new Peer(userId);

        console.log('see your newPeer', newPeer)

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser(newPeer)
        fetchUserFeed();

        const enterRoom = ({ roomId }: { roomId: string }) => {
            navigate(`/room/${roomId}`);
        }
        socket.on("room-created", enterRoom);
        
    }, [])

    return (
        <SocketContext.Provider value={{ socket, user, stream }}>
            {children}
        </SocketContext.Provider>
    )
}

export { SocketContext, SocketProvider }