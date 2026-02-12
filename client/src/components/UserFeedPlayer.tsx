import { useEffect, useRef } from "react";

const UserFeedPlayer: React.FC<{stream: MediaStream}> = ({stream}) => {
    
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream])

    return(
        <video
        ref={videoRef}
        style={{width:"500px", height:"500px"}}
        autoPlay
        />
    )
}

export { UserFeedPlayer }