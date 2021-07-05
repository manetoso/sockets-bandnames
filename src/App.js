import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

import { BandAdd } from './components/BandAdd'
import { BandList } from './components/BandList'

//--INIT SOCKET
const connectSocketServer = () => {
  const socket = io( 'https://socket-bandname-server.herokuapp.com/', {
    transports: [ 'websocket' ]
  })
  return socket
}

export const App = () => {

  const [ socket ] = useState( connectSocketServer() )
  const [ online, setOnline ] = useState( false )
  const [bands, setBands] = useState([])

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

  //--CHECK MESSAGE current-band FORM SOCKET
  useEffect(() => {
    socket.on( 'current-band', ( bands ) => {
      setBands( bands )
    })
  }, [ socket ])

  const vote = ( id ) => {
    socket.emit( 'vote-band', id )
  }

  const deleteBand = ( id ) => {
    socket.emit( 'delete-band', id )
  }

  const changeName = ( id, name ) => {
      socket.emit( 'change-band-name', {
        id,
        name
      })
  }

  const addBand = ( name ) => {
      socket.emit( 'add-new-band', {
        name
      })
  }

  return (
    <div className="container">
      <div className="alert">
        <p>
          Service status: {
            online
              ? <span className="text-success"> Online</span>
              : <span className="text-danger"> Offline</span>
          }
        </p>
      </div>

      <h1>BandNames</h1>
      <hr />

      <div className="row">
        <div className="col-8">
          <BandList
            data={ bands }
            vote={ vote }
            deleteBand={ deleteBand }
            changeName={ changeName }
          />
        </div>
        <div className="col-4">
          <BandAdd
            addBand={ addBand }
          />
        </div>
      </div>

    </div>
  )
}
