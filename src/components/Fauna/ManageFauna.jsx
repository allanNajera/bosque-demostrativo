import "../../globalStyles.css";
import React, { useState, useEffect } from "react";
import { db  } from "../../firebase";

import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';


import { useHistory } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

export const ManageFauna = () => {


    const history = useHistory();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    function handleEdit(element, event) {

        console.log("el elemento es:", element);

        history.push({ pathname: '/editFauna', state: element });
    }


    function handleDelete(element, event) {

        console.log("el elemento es:", element);

        db.collection("fauna").doc(element.id).delete().then(() => {
            console.log("Document successfully deleted!");
            setShow(true);
            cargarDB();
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });


       
    }



    let elementosFauna = [];

    let lista = "";

    const [loading, setLoading] = useState(true);

    const [elementosFaunaHtml, setelementosFaunaHtml] = useState(<div>pera</div>);


    function handleClickAdd() {
        history.push('/addFauna');
    }



    function cargarDB() {


        db.collection("fauna").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                //setFaunaList([...faunaList,{id:doc.id,data: doc.data()}] )
                elementosFauna.push({ id: doc.id, data: doc.data() })
            });

            setelementosFaunaHtml(elementosFauna);
            console.log(elementosFaunaHtml)

            setLoading(false)

        })
    };



    useEffect(() => {
        // setLoading(true); // here 
        cargarDB();
        console.log(loading)
    }, [])




    return <div className="backgroundContainer ">


        <div>
            <div
                id="card"
                className="ml-5 mt-3 card mx-auto border-info"
                style={{ width: "60rem" }}
            >

                <div className="row">

                    <div className="col-8">
                        <label id="tittle">
                            Gestionar información de Fauna{" "}
                        </label>
                    </div>
                    <div className="col-4" style={{ marginTop: "6.6%" }}>

                        <button className="btn-sm btn-Add" onClick={handleClickAdd}>Agregar elemento</button>



                    </div>

                </div>

                <table className="table">


                    <thead className="table-dark">
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>

                        {loading ? <tr>  </tr> : elementosFaunaHtml.map(element =>

                            <tr
                                key={element.id}
                            >
                                <td className="col-2 " >{element.data.name}</td>
                                <td className="col-8 center-justify " >{element.data.description}</td>
                                <td className="col-4 ">
                                    <div className="row">
                                    <div class="contenedor-botones">
                                        <button onClick={(e) => handleEdit(element)} className="btn-sm  mr-2 btn-Edit">Editar</button>
                                        <button onClick={(e) => handleDelete(element)}className="btn-sm btn-Delete">Eliminar</button>
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





