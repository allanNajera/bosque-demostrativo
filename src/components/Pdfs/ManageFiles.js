
import "../../globalStyles.css";
import React, { useState, useEffect } from "react";

import { db } from "../../firebase"

import { useAuth } from "../../contexts/AuthContext"

import { useHistory } from "react-router-dom";

import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';


export const ManageFiles = () => {

    const { currentUser, logout } = useAuth()

    const history = useHistory()

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    function handleDelete(element, event) {

        console.log("el elemento es:", element);

        db.collection("pdfs").doc(element.id).delete().then(() => {
            console.log("Document successfully deleted!");
            setShow(true);
            cargarDB();
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });


       
    }


    let quices = [];

    let lista = "";

    const [loading, setLoading] = useState(true);

    const [quicesHtml, setquicesHtml] = useState(<div>pera</div>);


    function handleClickAdd() {

        history.push('/addFile');
    }

    function handleDelete(element, event) {

        console.log("el elemento es:", element);

        db.collection("pdfs").doc(element.id).delete().then(() => {
            console.log("Document successfully deleted!");
            setShow(true);
            cargarDB();
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });


       
    }


    function cargarDB() {


        db.collection("pdfs").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                //setfloraList([...floraList,{id:doc.id,data: doc.data()}] )
                quices.push({ id: doc.id, data: doc.data() })
            });

            setquicesHtml(quices);
            setLoading(false)

        })
    };




    useEffect(() => {
        // setLoading(true); // here 
        cargarDB();
        console.log(loading)
    }, [])


    function reviewFile(element) {
        console.log(element);
        window.open(element.data.fileUrl, '_blank').focus();
       }



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
                            Gestionar archivos{" "}
                        </label>
                    </div>
                    <div className="col-4" style={{ marginTop: "3.0%" }}>

                        <button className="  btn-Add" onClick={handleClickAdd}>Agregar elemento</button>



                    </div>

                </div>

                <table class="table">


                    <thead class="table-dark">
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>

                        {loading ? <tr>  </tr> : quicesHtml.map(element =>

                            <tr>
                                <td>{element.data.name}</td>
                                <td>{element.data.type}</td>
                                <td>

                                    
                                    <div className="divider"> </div>
                                    <button onClick={(e) => handleDelete(element)} className="btn-sm btn-Delete mr-2">Eliminar</button>
                                     
                                    <button onClick={(e) => reviewFile(element)} className="btn-sm btn-Add">Revisar Archivo</button>

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


