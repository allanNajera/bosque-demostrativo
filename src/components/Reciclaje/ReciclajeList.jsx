import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import "../../globalStyles.css";

const ReciclajeList = ({ id, name, description, videoUrl }) => {
    
    const history = useHistory();
    const [ReciclajeState, setReciclajeState] = useState({ id: id, name: name, description: description, videoUrl: videoUrl});


    function handleDetails(ReciclajeState, event) {
        history.push({ pathname: '/detalles-practicas-saludables', state: ReciclajeState });
    }
    const image = '/assets/recycle-sign.png';
    return (
        <div className='row animate__animated animate__fadeIn mt-2'>
            <div className="card card-width ">

                <div className="row no-gutters ">
                    <div className="centrar-contenedor p-3 ">

                        <img src={image} className="card-img cat centrado " alt={image}></img>

                    </div>

                    <div className="row-6 ">
                        <h5 className="card-title center-text ">{name}</h5>
                        <div className="card-body centrar-contenedor">
                            <button onClick={(e) => handleDetails(ReciclajeState)} className='h5-text btn btn-outline-dark ' >
                                Más...
                            </button>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default ReciclajeList