import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import "../../globalStyles.css";

const PdfList = ({ element }) => {

    const history = useHistory();
    const [elementState, setelementState] = useState(element);


    function handleStart() {


    }
        
    function reviewFile() {
        console.log(element);
        window.open(element.data.fileUrl, '_blank').focus();
       }

      

    return (
        <div className='col animate__animated animate__fadeIn mt-2'>
            <div className="card card-width ">

                <div className="col no-gutters ">
                    
                    <div className="row-6 card-body  ">
                        <h5 style={{ fontWeight: "bold" }} className="card-title center-text " >{element.data.name}</h5>
                        <h5 className="card-title center-text " >{element.data.type}</h5>
                        <div className="centrar-contenedor ">
                            <button onClick={(e) => reviewFile() }  className='h5-text btn btn-outline-dark ' >
                                Abrir
                            </button>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default PdfList;