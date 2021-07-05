/*
    HOW TO USE ---->
        const { socket, online } = useSocket( 'https://server' )

        socket => callback to use sockets

        online => variable to see if the app is connected to the back or not
*/
import { useEffect, useMemo, useState } from 'react'
import { io } from 'socket.io-client'

//--INIT SOCKET
export const useSocket = ( serverPath ) => {
    // const socket = io( 'https://socket-bandname-server.herokuapp.com/', {
    // const socket = io( 'http://localhost:4000', {
    const socket = useMemo( () => io( serverPath , {
        transports: [ 'websocket' ]
    }), [ serverPath ] )

    const [ online, setOnline ] = useState( false )

    //--CHECK INITIAL CONNECTION TO SOCKET
    useEffect(() => {
        setOnline( socket.connect() )
    }, [ socket ])

    //--CHECK CONNECTION TO SOCKET
    useEffect(() => {
        socket.on( 'connect', () => {
        setOnline( true )
        })
    }, [ socket ])

    //--CHECK DISCONNECTION TO SOCKET
    useEffect(() => {
        socket.on( 'disconnect', () => {
        setOnline( false )
        })
    }, [ socket ])

    return {
        socket,
        online
    }
}
