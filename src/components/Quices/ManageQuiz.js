
import "../../globalStyles.css";
import React, { useState, useEffect } from "react";

import { db } from "../../firebase"

import { useAuth } from "../../contexts/AuthContext"

import { useHistory } from "react-router-dom";

import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';


export const ManageQuiz = () => {

    const { currentUser, logout } = useAuth()

    const history = useHistory()

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    function handleEdit(element, event) {

        console.log("el elemento es:", element);

        history.push({ pathname: '/EditFlora',state:  element });
    }

    

    function handleDelete(element, event) {

        console.log("el elemento es:", element);

        db.collection("quices").doc(element.id).delete().then(() => {
            console.log("Document successfully deleted!");
            setShow(true);
            cargarDB();
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });


       
    }


    let elementosflora = [];

    let lista = "";

    const [loading, setLoading] = useState(true);

    const [elementosFloraHtml, setelementosFloraHtml] = useState(<div>pera</div>);


    function handleClickAdd() {

        history.push('/addQuiz');
    }

    function handleDelete(element, event) {

        console.log("el elemento es:", element);

        db.collection("quices").doc(element.id).delete().then(() => {
            console.log("Document successfully deleted!");
            setShow(true);
            cargarDB();
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });


       
    }


    function cargarDB() {


        db.collection("quices").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                //setfloraList([...floraList,{id:doc.id,data: doc.data()}] )
                elementosflora.push({ id: doc.id, data: doc.data() })
            });

            setelementosFloraHtml(elementosflora);
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
                            Gestionar información de quices{" "}
                        </label>
                    </div>
                    <div className="col-4" style={{ marginTop: "6.6%" }}>

                        <button className="  btn-Add" onClick={handleClickAdd}>Agregar elemento</button>



                    </div>

                </div>

                <table class="table">


                    <thead class="table-dark">
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Número de preguntas</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>

                        {loading ? <tr>  </tr> : elementosFloraHtml.map(element =>

                            <tr>
                                <td>{element.data.name}</td>
                                <td>{element.data.questions.length}</td>
                                <td>

                                    
                                    <div className="divider"> </div>
                                    <button onClick={(e) => handleDelete(element)}className="btn-sm btn-Delete">Eliminar</button>


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


