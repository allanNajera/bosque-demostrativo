import "../../globalStyles.css";

import React, { useState, useEffect } from "react";

import { db, storage, storageRef } from "../../firebase"



import { Modal } from 'react-bootstrap';

import { Button } from 'react-bootstrap';

import { useHistory } from "react-router-dom";


import Navbar from "../Navbar/Navbar"


const EditFlora = (elementE) => {


    const  element  = elementE.location.state;

    

    console.log("este es el elemento", element);

    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()


    const history = useHistory();
    const handleReturn = () => {
        history.push('/ManageFlora');
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
        setImage(e.target.files[0])
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
    }



    const [floraData, setInputs] = useState(element.data);
    const [image, setImage] = useState("");

    const [imageURL, setImageUrl] = useState("");

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


        console.log(image.name);



        if (image != "") {
            var uploadTask = storageRef.child('images/' + image.name).put(image);
            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');

                },
                (error) => {
                    console.log(error)
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        const URL = "imageUrl"

                        setImageUrl(downloadURL);

                        setInputs((values) => ({ ...values, [URL]: downloadURL }));


                        db.collection("flora").doc(element.id)
                            .set({
                                ...floraData,
                                imageUrl: downloadURL

                            }).then(() => {
                                setShow(true)
                            })
                            .catch((error) => {
                                setError(true);
                                console.error("Error adding document: ", error);
                            });
                    });





                }
            );


        } else {


            db.collection("flora").doc(element.id)
                .set({
                    ...floraData,
                    imageUrl: element.data.imageUrl

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
                                value={floraData.name || ""}
                                onChange={handleChange}
                            ></input>
                        </div>

                        <div class="form-group col-md-4">
                            <label for="metabolicAge">Descripción</label>
                            <input
                                type="text"
                                className="form-control"
                                name="description"
                                value={floraData.description || ""}
                                onChange={handleChange}
                            ></input>
                        </div>

                        <div class="form-group col-md-4">
                            <label for="metabolicAge">Biología</label>
                            <input
                                type="text"
                                className="form-control"
                                name="biology"
                                value={floraData.biology|| ""}
                                onChange={handleChange}
                            ></input>
                        </div>

                        <div class="form-group col-md-4">
                            <label for="metabolicAge">Usa tradicional</label>
                            <input
                                type="text"
                                className="form-control"
                                name="traditionalUse"
                                value={floraData.traditionalUse || ""}
                                onChange={handleChange}
                            ></input>
                        </div>

                        

                        <div class="form-group col-md-8">
                            <label for="metabolicAge">Imagen</label>

                            <input className="form-control mt-2" type="file" onChange={onFileUpload} />


                            {selectedFile && <img className="mt-3" src={preview} />}
                            {!selectedFile ? <img className="mt-3" src={element.data.imageUrl} /> : <div></div>}


                        </div>
                        <div style={{ fontWeight: "bold" }} className="m-1">
                            <input
                                style={{ fontWeight: "bold" }}
                                type="radio"
                                value="forestales"
                                name="type"
                                onChange={handleChange}
                                checked={floraData.type === "forestales"? true:false}
                            />{" "}
                            Plantas forestales{" "}
                        </div>
                        <div style={{ fontWeight: "bold" }} className="m-1">
                            {" "}
                            <div></div>
                            <input
                                type="radio"
                                value="medicinales"
                                name="type"
                                onChange={handleChange}
                                checked={floraData.type === "medicinales"? true:false}
                            />{" "}
                            Plantas medicinales{" "}
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

export default EditFlora;