import React from 'react'
import { SocketProvider } from './context/SocketContext'
import { HomePage } from './HomePage'

export const BandNamesApp = () => {
    return (
        <SocketProvider serverPath={ 'http://localhost:4000' }>
            <HomePage />
        </SocketProvider>
    )
}
