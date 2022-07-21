import "../../globalStyles.css";
import React, { useState, useEffect, Component } from "react";
import { db, storage, storageRef } from "../../firebase"
import { useAuth } from "../../contexts/AuthContext"

import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

import { useHistory } from "react-router-dom";

export const ManageReciclaje = () => {

    const { currentUser, logout } = useAuth()

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const history = useHistory()

    function handleEdit(element, event) {

        console.log("el elemento es:", element);

        history.push({ pathname: '/Editpracticas-saludables', state: element });
    }

    function handleDelete(element, event) {

        console.log("el elemento es:", element);

        db.collection("reciclaje").doc(element.id).delete().then(() => {
            console.log("Document successfully deleted!");
            setShow(true);
            cargarDB();
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });



    }

    let elementosReciclaje = [];

    let lista = "";

    const [loading, setLoading] = useState(true);

    const [elementosReciclajeHtml, setelementosReciclajeHtml] = useState(<div>pera</div>);

    function handleClickAdd() {

        history.push('/addpracticas-saludables');
    };

    function cargarDB() {


        db.collection("reciclaje").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                elementosReciclaje.push({ id: doc.id, data: doc.data() })
            });

            setelementosReciclajeHtml(elementosReciclaje);
            setLoading(false)

        })
    };

    useEffect(() => {
        // setLoading(true); // here 
        cargarDB();
        console.log(loading)
    }, [])

    return <div>

        <div>
            <div
                id="card"
                className="ml-5 mt-3 card mx-auto border-info"
                style={{ width: "60rem" }}
            >

                <div class="row">

                    <div className="col-8">
                        <label id="tittle" for="tittle">
                            Gestionar información de Reciclaje
                        </label>
                    </div>
                    <div className="col-4" style={{ marginTop: "6.6%" }}>

                        <button className="btn-sm btn-Add" onClick={handleClickAdd}>Agregar elemento</button>



                    </div>

                </div>

                <table class="table">


                    <thead class="table-dark">
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>

                        {loading ? <tr>  </tr> : elementosReciclajeHtml.map(element =>

                            <tr>
                                <td className="col-2" >{element.data.name}</td>
                                <td className="col-8 center-justify " >{element.data.description}</td>
                                <td className="col-4 ">

                                    <div className="row">
                                        <div class="contenedor-botones">
                                            <button onClick={(e) => handleEdit(element)} className="btn-sm  mr-2 btn-Edit">Editar</button>
                                            <button onClick={(e) => handleDelete(element)} className="btn-sm btn-Delete">Eliminar</button>
                                        </div>
                                    </div>

                                </td>

                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>


        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>¡Elemento eliminado con exito!</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="success" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>


    </div>;

};
