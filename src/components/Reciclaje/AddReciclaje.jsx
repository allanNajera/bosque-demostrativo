import '../../globalStyles.css'
import React, { useState } from 'react';
import { db } from "../../firebase"


import { Modal } from 'react-bootstrap';

import { Button } from 'react-bootstrap';

import ReactPlayer from 'react-player';

import { useHistory } from "react-router-dom";



const AddReciclaje = () => {

    const history = useHistory();
    const handleReturn = () => {
        history.push("/managepracticas-saludables");
    }

    const [tarea, setInputs] = useState({});

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const [showError, setError] = useState(false);

    const handleCloseError = () => setError(false);


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
        console.log(value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (tarea.videoUrl == "") {
            console.log("Seleccione un video.")
            return;
        }
        db.collection("reciclaje")
            .add({
                ...tarea
            })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
                setShow(true)
            })
            .catch((error) => {
                setError(true);
                console.error("Error adding document: ", error);
            });
            
    }

 

    return (
        <div>
            <div id="card" className="ml-5 mt-3 card mx-auto border-info" style={{ width: "60rem" }}>

                <form id="form" autocomplete="off" onSubmit={handleSubmit}>

                    <div>
                        <label id="tittle" for="tittle">Agregar Tarea de Prácticas Saludables{" "} </label>
                    </div>

                    <div class="form-row">


                        <div class="form-group col-md-4">
                            <label for="height">Nombre de Tarea</label>
                            <input type="text" className="form-control" name="name" value={tarea.name || ""} onChange={handleChange} ></input>
                        </div>

                        <div class="form-group col-md-4">
                            <label for="metabolicAge">Descripción</label>
                            <input type="text" className="form-control" name="description" value={tarea.description || ""} onChange={handleChange}></input>
                        </div>

                        <div class="form-group col-md-8">
                            <label for="metabolicAge">Video Url</label>
                            <input type="text" className="form-control" name="videoUrl" value={tarea.videoUrl || ""} onChange={handleChange}></input>
                            {tarea.videoUrl && <ReactPlayer className="mt-3" url={tarea.videoUrl} controls />}

                        </div>

                    </div>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>¡Elemento agregado con exito!</Modal.Title>
                        </Modal.Header>
                        <Modal.Footer>
                            <Button variant="success" onClick={handleReturn}>
                            Cerrar
                            </Button>
                        </Modal.Footer>
                    </Modal>


                    <Modal show={showError} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>¡Hubo un problema agregando el elemento !</Modal.Title>
                        </Modal.Header>
                        <Modal.Footer>
                            <Button variant="danger" onClick={handleCloseError}>
                            Cerrar
                            </Button>
                        </Modal.Footer>
                    </Modal>


                    <div class="contenedor-botones">
                        <button
                            className="btn-sm mr-2 btn-Add "
                            type="submit">
                            Añadir
                        </button>

                        <button
                            type="button"
                            className="btn-sm btn-Delete"
                            onClick={handleReturn}>
                            Regresar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddReciclaje;


