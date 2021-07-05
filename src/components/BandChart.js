import React, { useContext, useEffect } from 'react'
import { Chart, registerables } from 'chart.js'
import { SocketContext } from '../context/SocketContext'

Chart.register(...registerables)
let myChart

export const BandChart = () => {

    const { socket } = useContext( SocketContext )

    //--CHECK MESSAGE current-band FORM SOCKET
    useEffect(() => {
        socket.on( 'current-band', ( bands ) => {
            createGraph( bands )
        })
    }, [ socket ])

    const createGraph = ( bands= [] ) => {
        const ctx = document.getElementById('myChart')
        if ( typeof myChart !== "undefined" ) myChart.destroy()
        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: bands.map( (band) => band.name ),
                datasets: [{
                    label: 'Número de Votos',
                    data: bands.map( (band) => band.votes ),
                    backgroundColor: [
                        'rgba(159, 81, 182, 0.2)',
                        'rgba(247, 194, 168, 0.2)',
                        'rgba(240, 120, 80, 0.2)',
                        'rgba(156, 221, 41, 0.2)',
                        'rgba(92, 119, 243, 0.2)',
                    ],
                    borderColor: [
                        'rgba(159, 81, 182, 1)',
                        'rgba(247, 194, 168, 1)',
                        'rgba(240, 120, 80, 1)',
                        'rgba(156, 221, 41, 1)',
                        'rgba(92, 119, 243, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                animation: false,
                indexAxis: 'y',
                scales: {
                    x: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    return (
        <canvas id="myChart" ></canvas>
    )
}
