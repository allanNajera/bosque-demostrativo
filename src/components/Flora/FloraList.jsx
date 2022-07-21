import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import "../../globalStyles.css";


const FloraList = ({ id, name, description, img, biology, traditionalUse  }) => {
    const history = useHistory();
    const [floraState, setfloraState] = useState({ id: id, name: name, description: description, img: img, biology:biology, traditionalUse:traditionalUse  });


    function handleDetails(floraState, event) {
        history.push({ pathname: '/detalles-flora', state: floraState });
    }
    return (
        <div className='col animate__animated animate__fadeIn '>
            <div className="card card-width ">

                <div className="column no-gutters ">
                    <div className="row-6 ">

                        <img src={img} className="card-img cat p-3" alt={img}></img>

                    </div>

                    <div className="row-6 card-body ">
                        <h5 className="card-title center-text">{name}</h5>
                        <div className="centrar-contenedor ">
                            <button onClick={(e) => handleDetails(floraState)} className='h5-text btn btn-outline-dark ' >
                                Más...
                            </button>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default FloraList