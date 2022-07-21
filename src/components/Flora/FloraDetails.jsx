import React from 'react'
import { useHistory } from 'react-router-dom';

const FloraDetail = (flora) => {

    const history = useHistory();

    const handleReturn = () => {
        history.push("/flora");
    }

    return (
        <div className="row mx-auto centrar-contenedor">
           <div className="col-10 ">
           <div className='col-6 mt-5 centrado ' >
                <img
                    src={flora.location.state.img}
                    className="img-thumbnail centrado p-3 " >
                </img>
            </div>

            <h3 className="center-text h3-details " >{flora.location.state.name}</h3>

            <div className="div-row-details centrar-contenedor  ">

                <div className='row-details col-lg-4 '>
                    <h5 className="center-text ">Descripción</h5>
                    <p className="center-justify p-details">{flora.location.state.description}</p>
                </div>

                <div className='row-details col-lg-4 '>
                    <h5 className="center-text ">Biología</h5>
                    <p className="center-justify p-details ">{flora.location.state.biology}</p>
                </div>

                <div className='row-details col-lg-4 '>
                    <h5 className="center-text ">Uso tradicional</h5>
                    <p className="center-justify p-details">{flora.location.state.traditionalUse}</p>
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

export default FloraDetail