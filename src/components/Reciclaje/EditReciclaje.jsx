import "../../globalStyles.css";
import React, { useState, useEffect } from "react";
import { db, storage, storageRef } from "../../firebase"

import { useAuth } from "../../contexts/AuthContext"


import ReactPlayer from 'react-player';

import { Modal } from 'react-bootstrap';

import { Button } from 'react-bootstrap';

import { useHistory } from "react-router-dom";


const EditReciclaje = (elementE) => {

    const { currentUser, logout } = useAuth()


    const element = elementE.location.state;


    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()


    const history = useHistory();
    const handleReturn = () => {
        history.push("/managepracticas-saludables");
    }

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onFileUpload = e => {
        setVideo(e.target.files[0])
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
    }



    const [reciclajeData, setInputs] = useState(element.data);
    const [video, setVideo] = useState("");

    const [videoURL, setVideoUrl] = useState("");

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);


    const [showError, setError] = useState(false);

    const handleCloseError = () => setError(false);



    // create a preview as a side effect, whenever selected file is changed


    const handleShow = () => setShow(true);



    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
        console.log(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();


        console.log(video.name);



        if (reciclajeData.videoUrl != "") {

            db.collection("reciclaje").doc(element.id)
                .set({
                    ...reciclajeData

                }).then(() => {
                    setShow(true)
                })
                .catch((error) => {
                    setError(true);
                    console.error("Error adding document: ", error);
                });

        } else {
            db.collection("reciclaje").doc(element.id)
                .set({
                    ...reciclajeData

                }).then(() => {
                    setShow(true)
                })
                .catch((error) => {
                    setError(true);
                    console.error("Error adding document: ", error);
                });
        }
    }
    const upload = () => {

    };

    return (
        <div>
            <div
                id="card"
                className="ml-5 mt-3 card mx-auto border-info"
                style={{ width: "60rem" }}
            >
                <form id="form" autocomplete="off" onSubmit={handleSubmit}>
                    <div>
                        <label id="tittle" for="tittle">
                            Editar {element.data.name}{" "}
                        </label>
                    </div>

                    <div class="form-row">


                        <div class="form-group col-md-4">
                            <label for="height">Nombre</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={reciclajeData.name || ""}
                                onChange={handleChange}
                            ></input>
                        </div>

                        <div class="form-group col-md-4">
                            <label for="metabolicAge">Descripción</label>
                            <input
                                type="text"
                                className="form-control"
                                name="description"
                                value={reciclajeData.description || ""}
                                onChange={handleChange}
                            ></input>
                        </div>

                        <div class="form-group col-md-8">
                            <label for="metabolicAge">Descripción</label>
                            <input
                                type="text"
                                className="form-control"
                                name="videoUrl"
                                value={reciclajeData.videoUrl || ""}
                                onChange={handleChange}
                            ></input>
                            {reciclajeData.videoUrl && <ReactPlayer className="mt-3" url={reciclajeData.videoUrl} controls />}

                        </div>
                    </div>

                    <button type="submit" className="btn-sm  mr-2 btn-Edit">
                        Editar
                    </button>


                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>¡Elemento editado con exito!</Modal.Title>
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
                    <button onClick={handleReturn} type="button" class="btn-sm btn-Delete">
                        Regresar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditReciclaje;