import "../../globalStyles.css";
import React, { useState, useEffect } from "react";
import { db, storageRef } from "../../firebase";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const SeeResults = (elementE) => {
  const element = { ...elementE.location.state };
  const history = useHistory();

  var counter = 0;
  const handleReturn = () => {
    history.push("/SelectQuiz");
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const [showError, setError] = useState(false);

  const handleCloseError = () => setError(false);

  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <div
        id="card"
        className="ml-5 mt-3 card mx-auto border-info"
        style={{ width: "60rem" }}
      >
        <div className="col-12 centrar-contenedor">
          <label id="tittle" for="tittle">
            Tu resultado: {element.scoreTest}
          </label>
        </div>

        <div className="col-12 centrar-contenedor">
          <label id="tittle" for="tittle">
            Aciertos {element.score}/{element.data.questions.length}
          </label>
        </div>

        <div className="col-12 ">
          <label style={{ color: "green", fontSize: "30px" }} id="subtittle">
            Respuestas
          </label>
        </div>

        {false ? (
          <tr> </tr>
        ) : (
          element.data.questions.map((element, index) => (
            <div key={element.id} className="m-2">
              <div style={{ fontWeight: "bold" }}>{index+1}- {element.question} </div>

              <div style={{ marginLeft: "25px" }}>a) {element.options[0]} </div>
              <div style={{ marginLeft: "25px" }}>b) {element.options[1]} </div>
              <div style={{ marginLeft: "25px" }}>c) {element.options[2]} </div>

              <div>
                <label style={{ fontWeight: "bold" }}>
                  Respuesta correcta:{" "}
                </label>{" "}
                {elementE.location.state.rightAnswers[index]}
              </div>
              <div>
                <label style={{ fontWeight: "bold" }}>
                  Tu respuesta:{" "}
                </label>{" "}
                {elementE.location.state.questionsAnswered[index]}
              </div>
            </div>
          ))
        )}

       

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>¡Elemento editado con exito!</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="success" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showError} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>¡Hubo un problema agregando el elemento !</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="danger" onClick={handleCloseError}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <button
          onClick={handleReturn}
          type="button"
          class="btn btn-secondary m-2"
        >
          Volver a la selección
        </button>
      </div>
    </div>
  );
};

export default SeeResults;
