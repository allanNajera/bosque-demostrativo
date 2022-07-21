import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import "../../globalStyles.css";

const FaunaList = ({ id, name, description, img }) => {

    const history = useHistory();
    const [faunaState, setfaunaState] = useState({ id: id, name: name, description: description, img: img});


    function handleDetails(faunaState, event) {
        history.push({ pathname: '/detalles-fauna', state: faunaState });
    }

    return (
        <div className='col animate__animated animate__fadeIn mt-2'>
            <div className="card card-width ">

                <div className="col no-gutters ">
                    <div className="row-6 ">

                        <img src={img} className="card-img cat p-3 " alt={img}></img>

                    </div>

                    <div className="row-6 card-body  ">
                        <h5 className="card-title center-text " >{name}</h5>
                        <div className="centrar-contenedor ">
                            <button onClick={(e) => handleDetails(faunaState)} className='h5-text btn btn-outline-dark ' >
                                Más...
                            </button>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default FaunaList