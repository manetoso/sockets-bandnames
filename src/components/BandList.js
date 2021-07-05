import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/SocketContext'

import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { FaTrashAlt } from 'react-icons/fa';

export const BandList = () => {

    const [bands, setBands] = useState([])
    const { socket } = useContext( SocketContext )

    //--CHECK MESSAGE current-band FORM SOCKET
    useEffect(() => {
        socket.on( 'current-band', ( bands ) => {
            setBands( bands )
        })
        return () => socket.off( 'current-band' )
    }, [ socket ])

    const nameChanged = ( event, id ) => {
        const newName = event.target.value
        setBands( bands => bands.map( ( band ) => {
            if ( band.id === id ) {
                band.name = newName
            }
            return band
        }))
    }

    //--SOCKET EMIT TO CHANGE THE BAND NAME
    const changeBandName = ( id, name ) => {
        socket.emit( 'change-band-name', {
            id,
            name
        })
    }

    //--SOCKET EMIT TO VOTE THE BAND
    const voteBand = ( id ) => {
        socket.emit( 'vote-band', id )
    }

    //--SOCKET EMIT TO CANCEL THE VOTE FOR BAND
    const unvoteBand = ( id ) => {
        socket.emit( 'unvote-band', id )
    }

    //--SOCKET EMIT TO DELETE THE BAND
    const deleteBand = ( id ) => {
        socket.emit( 'delete-band', id )
    }

    const createRows = () => {
        return (
            bands.map( ( band ) => (
                <tr key={ band.id }>
                    <td>
                        <button
                            className="btn btn-dark me-2 mt-2"
                            onClick={ () => voteBand( band.id ) }
                        >
                            <AiOutlinePlusCircle style={{ marginBottom: '1px', fontSize: '23px' }} />
                        </button>
                        <button
                            className="btn btn-dark mt-2"
                            onClick={ () => unvoteBand( band.id ) }
                        >
                            <AiOutlineMinusCircle style={{ marginBottom: '1px', fontSize: '23px' }} />
                        </button>
                    </td>
                    <td>
                        <form
                            onSubmit={ ( e ) => {
                                e.preventDefault()
                                changeBandName( band.id, band.name )
                            }}
                        >
                            <input
                                className="form-control"
                                value={ band.name }
                                onChange={ ( event ) => nameChanged( event, band.id ) }
                            />
                        </form>
                    </td>
                    <td> <h3> { band.votes } </h3> </td>
                    <td>
                        <button
                            className="btn btn-outline-danger"
                            onClick={ () => deleteBand( band.id ) }
                        >
                            <FaTrashAlt style={{ marginBottom: '5px' }} /> Borrar
                        </button>
                    </td>
                </tr>
            ))
        )
    }

    return (
        <>
            <h3>Bandas Actuales</h3>
            <table className="table table-stripped">
                <thead>
                    <tr>
                        <th></th>
                        <th>Nombre</th>
                        <th>Votos</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    { createRows() }
                </tbody>
            </table>
        </>
    )
}
