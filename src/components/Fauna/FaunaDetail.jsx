import React from 'react'
import { useHistory } from 'react-router-dom';

const FaunaDetail = (fauna) => {

    const history = useHistory();

    const handleReturn = () => {
        history.push("/fauna");
    }

    return (
        <div className="row mx-auto centrar-contenedor">
            <div className='col-10'>
                <div className='col-6 mt-5 centrado ' >
                    <img
                        src={fauna.location.state.img}
                        className="img-thumbnail centrado p-3 " >
                    </img>
                </div>

                <h3 className="center-text h3-details " >{fauna.location.state.name}</h3>

                <div className="div-row-details  centrar-contenedor ">

                    <div className='row-details fauna-details '>
                        <h5 className="center-text ">Descripción</h5>
                        <div className='centrar-contenedor '>
                        <p className="center-justify p-details">{fauna.location.state.description}</p>
                        </div>
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

export default FaunaDetail