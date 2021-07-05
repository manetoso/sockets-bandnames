import React, { useState } from 'react'

export const BandAdd = ({ addBand }) => {

    const [bandName, setBandName] = useState('')

    return (
        <>
            <h3>Agregar Banda</h3>
            <form
                onSubmit={ ( e ) => {
                    e.preventDefault()
                    if ( bandName.trim().length > 0 ) {
                        addBand( bandName )
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
