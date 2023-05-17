import io from "socket.io-client/dist/socket.io.js";
import { BACKEND_HOST, BACKEND_PORT } from '@env'
import React from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import useAuth from "./useAuth";

const endpoint = `http://${BACKEND_HOST}:${BACKEND_PORT}`
console.log("Socket endpoint", endpoint)
const socket = io(endpoint, { transports: ['websocket'] });


export default function useSocket() {
    const { auth } = useAuth()._j;

    React.useEffect(() => {
        const handshakeListener = (id) => {
            socket.emit("handshake", {userId: auth?.user.id, socketId: id})
        }
        socket.on("handshake", handshakeListener)
        
        return () => {
            socket.off("handshake", handshakeListener)
        }
    }, [])

    return socket
}