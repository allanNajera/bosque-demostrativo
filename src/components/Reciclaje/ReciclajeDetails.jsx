import React, { useEffect } from 'react'
import ReactPlayer from 'react-player';
import { useHistory } from 'react-router-dom';
import { useParams, Navigate, useNavigate } from "react-router-dom"
import { db, storage, storageRef } from "../../firebase";

const ReciclajeDetails = (Reciclaje) => {


    const history = useHistory();

    const handleReturn = () => {
        history.push("/practicas-saludables");
    }

    return (
        <div>
            <div className="centrar-contenedor">
                <div>
                    <ReactPlayer className="mt-3 p-3" url={Reciclaje.location.state.videoUrl} controls />
                </div>
            </div>

            <div>
                <h3 className="center-text h3-details " >{Reciclaje.location.state.name}</h3>

                <div className="div-row-details  centrar-contenedor">

                    <div className='row-details col-lg-4 '>
                        <h5 className="center-text ">Descripción</h5>
                        <p className="center-text p-details ">{Reciclaje.location.state.description}</p>
                    </div>

                </div>

                <div className="centrar-contenedor  ">
                    <button
                        className="btn btn-outline-info "
                        onClick={handleReturn}>
                        Regresar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ReciclajeDetails