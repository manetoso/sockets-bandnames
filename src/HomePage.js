import React, { useContext } from 'react'
import { SocketContext } from './context/SocketContext'

import { GrStatusGood } from 'react-icons/gr';
import { AiOutlineDisconnect } from 'react-icons/ai';

import { BandAdd } from './components/BandAdd'
import { BandList } from './components/BandList'
import { BandChart } from './components/BandChart'

export const HomePage = () => {

  const { online } = useContext( SocketContext )
  
  return (
    <div className="container mt-3 mb-5">
      <div className="alert" style={{ marginBottom: '-25px' }}>
        <p>
          Estado del servidor: {
            online
              ? <span className="text-success"> Online <GrStatusGood /></span>
              : <span className="text-danger"> Offline <AiOutlineDisconnect /></span>
          }
        </p>
      </div>

      <h1>Nombres de Bandas</h1>
      <hr />

      <div className="row d-flex justify-content-center">
        <div className="col-md-8">
          <BandChart />
        </div>
      </div>
      <hr />

      <div className="row">
        <div className="col-md-8">
          <BandList />
        </div>
        <div className="col-md-4">
          <BandAdd />
        </div>
      </div>

    </div>
  )
}
