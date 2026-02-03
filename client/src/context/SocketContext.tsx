import SocketIoClient from "socket.io-client";
import { createContext } from "react";

const WEBSOCKET_SERVER = "http://localhost:5500";

export const SocketContext = createContext<any | null>(null);

const socket = SocketIoClient(WEBSOCKET_SERVER,{
    withCredentials: false,
    transports : ["pooling", "websocket"]
});

interface Props {
    children : React.ReactNode
}

export const SocketProvider:React.FC<Props> = ({children}) => {
    return(
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}