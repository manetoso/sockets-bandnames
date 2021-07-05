import React, { useContext, useState } from 'react'
import { SocketContext } from '../context/SocketContext'

export const BandAdd = () => {

    const [bandName, setBandName] = useState('')
    const { socket } = useContext( SocketContext )

    const addNewBand = ( name ) => {
        socket.emit( 'add-new-band', {
            name
        })
    }

    return (
        <>
            <h3>Agregar Banda</h3>
            <form
                onSubmit={ ( e ) => {
                    e.preventDefault()
                    if ( bandName.trim().length > 0 ) {
                        addNewBand( bandName )
                        setBandName( '' )
                    }
                }}
            >
                <input
                    className="form-control"
                    placeholder="Nuevo nombre de banda"
                    value={ bandName }
                    onChange={ ( e ) => {
                        const name = e.target.value
                        setBandName( name )
                    }}
                />
            </form>
        </>
    )
}
