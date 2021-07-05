import React, { useEffect, useState } from 'react'

export const BandList = ({ data, vote, deleteBand, changeName }) => {

    const [bands, setBands] = useState(data)

    useEffect(() => {
        setBands( data )
    }, [ data ])

    const nameChanged = ( event, id ) => {
        const newName = event.target.value
        setBands( bands => bands.map( ( band ) => {
            if ( band.id === id ) {
                band.name = newName
            }
            return band
        }))
    }

    const onLostFocus = ( id, name ) => {
        console.log( id, name ) 
    }

    const createRows = () => {
        return (
            bands.map( ( band ) => (
                <tr key={ band.id }>
                    <td>
                        <button
                            className="btn btn-dark"
                            onClick={ () => vote( band.id ) }
                        >
                            +1 
                        </button>
                    </td>
                    <td>
                        <form
                            onSubmit={ ( e ) => {
                                e.preventDefault()
                                onLostFocus( band.id, band.name )
                                changeName( band.id, band.name )
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
                            Borrar
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
