import React from 'react'
import { SocketProvider } from './context/SocketContext'
import { HomePage } from './HomePage'

export const BandNamesApp = () => {
    return (
        <SocketProvider serverPath={ 'https://socket-bandname-server.herokuapp.com/' }>
            <HomePage />
        </SocketProvider>
    )
}
