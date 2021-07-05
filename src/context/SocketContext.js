/*
    import { SocketProvider } from './context/SocketContext'

     HOW TO USE ---->
        <SocketProvider serverPath={ 'http://server' }>
            <App />
        </SocketProvider>

        App => Father Component

        serverPath => path to the server were aire the Web Sockets

    HOW TO CALL THE socket AND online ATTRIBUTES FROM useSocket ---->
        const { socket, online } = useContext( SocketContext )

        necesary to import useContext from React !!!
*/
import React from 'react';
import { createContext } from "react";
import { useSocket } from "../hooks/useSocket";

export const SocketContext = createContext()

export const SocketProvider = ({ children, serverPath }) => {

    const { socket, online } = useSocket( serverPath )

    return (
        <SocketContext.Provider value={{ socket, online }} >
            { children }
        </SocketContext.Provider>
    )
}