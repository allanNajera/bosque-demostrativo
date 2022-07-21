import "../../globalStyles.css";
import React, { useState, useEffect } from "react";
import { db, storageRef } from "../../firebase";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const AnswerQuestions = (elementE) => {
  const element = { ...elementE.location.state };
  const history = useHistory();

  var counter = 0;
  const handleReturn = () => {
    history.push("/SeeText");
    history.push({ pathname: "/SelectQuiz", state: element });
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const [showError, setError] = useState(false);

  const handleCloseError = () => setError(false);

  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  let rightAnswers = element.rightAnswers;

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  const handleValidate = () => {
    console.log("rightAnswers", rightAnswers);
    let formReady = true;

    for (let index = 0; index < questionsAnswered.length; index++) {
      if (questionsAnswered[index] == "") {
        formReady = false;
      }
    }
    if (formReady == false) {
      console.log("no esta listo");
    } else {
      console.log("listo");

      let score = 0;

      //ver cantidad de buenas
      for (let index = 0; index < rightAnswers.length; index++) {
        if (rightAnswers[index] == questionsAnswered[index]) {
          score = score + 1;
        }
      }
      let scoreTest = (100 / questionsAnswered.length) * score;

    
        console.log("aciertos", score, "nota", scoreTest);
        let information= {...elementE.location.state,score,scoreTest,questionsAnswered}
        history.push({ pathname: '/SeeResults',state: information });
    }
   

  };

  //save answers

  let questionsAnswered = [];
  for (let index = 0; index < element.data.questions.length; index++) {
    questionsAnswered.push("");
  }

  console.log("array de falses", questionsAnswered);

  //randomize vector

  for (let index = 0; index < element.data.questions.length; index++) {
    shuffle(element.data.questions[index].options);
  }

  console.log(element.data.questions);

  const handleSelectAnswer = (selectedAnswer, index) => {
    questionsAnswered[index] = selectedAnswer;

    console.log(
      "la respuesta seleccionada es ",
      selectedAnswer,
      "con index ",
      index
    );

    console.log("estado de mi array de respuestas", questionsAnswered);
  };

  return (
    <div>
      <div
        id="card"
        className="ml-5 mt-3 card mx-auto border-info"
        style={{ width: "60rem" }}
      >
        <div className="col-8">
          <label id="tittle" for="tittle">
            Preguntas{" "}
          </label>
        </div>

        {false ? (
          <tr> </tr>
        ) : (
          element.data.questions.map((element, index) => (
            <div key={element.id} className="m-2">
              <div style={{ fontWeight: "bold" }}>{index+1}- {element.question} </div>

              <div style={{ marginLeft: "25px" }}>
                {" "}
                <input
                  type="radio"
                  value="Male"
                  name={element.question}
                  onChange={(e) =>
                    handleSelectAnswer(element.options[0], index)
                  }
                />{" "}
                a) {element.options[0]}{" "}
              </div>
              <div style={{ marginLeft: "25px" }}>
                <input
                  type="radio"
                  value="Female"
                  name={element.question}
                  onChange={(e) =>
                    handleSelectAnswer(element.options[1], index)
                  }
                />{" "}
                b) {element.options[1]}{" "}
              </div>
              <div style={{ marginLeft: "25px" }}>
                {" "}
                <input
                  type="radio"
                  value="Other"
                  name={element.question}
                  onChange={(e) =>
                    handleSelectAnswer(element.options[2], index)
                  }
                />{" "}
                c) {element.options[2]}{" "}
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
        <div className="form-group col-md-12 mt-4 ">
        <button
          onClick={handleValidate}
          className="btn-ConfirmQuizz btn-block mb-2"
        >
          Ver resultados
        </button>

        <button
          onClick={handleReturn}
          type="button"
          class="btn-block btn-ReturnQuizz mb-2"
        >
          Regresar
        </button>
        </div>
      </div>
    </div>
  );
};

export default AnswerQuestions;
