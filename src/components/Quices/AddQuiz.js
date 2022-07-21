import React, { Fragment, useEffect, useState } from "react";
import FilePlayer from "react-player/file";
import { db } from "../../firebase"
import '../../globalStyles.css'

import { Modal } from 'react-bootstrap';

import { Button } from 'react-bootstrap';

import { useHistory } from "react-router-dom";

const AddQuiz = () => {
  
  const history = useHistory();

  //for success message 
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  //for error message
  const [showError, setError] = useState(false);
  const handleCloseError = () => setError(false);


  const [formState, setFormState] = useState({
    name: "",
    text: "",
  });

  const [questionForm, setQuestion] = useState({
    question: "",
    options: ["", "", ""],
  });

  const [questionList, setQuestionList] = useState([""]);

  const { name, text } = formState;

  const { question, options } = questionForm;

  const addQuestion = () => {
    console.log("La pregunta en el addQuestion es", questionForm);
    console.log("antes el objeto completo es ", questionList);
    if (
      question !== "" &&
      options[0] !== "" &&
      options[1] !== "" &&
      options[2] !== ""
    ) {
      console.log("entro al if");

      if (questionList.length > 0) {
        setQuestionList([...questionList, { question, options }]);
      }
      if (questionList[0] == "") {
        setQuestionList([{ question, options }]);
      }

      
      setQuestion({
        question: "",
        options: ["", "", ""],
      });

      console.log("despues el objeto completo es ", questionList);
    }
  };

  //   setFormState(prevState => ({
  //     ...prevState,
  //      questions: questionForm
  // }))

  const handleQuestionChange = (target, index) => {
    console.log("el target es", target);

    if (index == -1) {
      console.log("ENTRA", target);
      setQuestion({
        ...questionForm,
        [target.name]: target.value,
      });
    } else {
      options[index] = target.value;
      setQuestion({
        ...questionForm,
        options: options,
      });
    }
    console.log("la pregunta es", questionForm);
  };

  const handleNameAndText = ({ target }) => {
    setFormState({
      ...formState,
      [target.name]: target.value,
    });
  };

  useEffect(() => {
    console.log(formState.name, formState.text);
  }, [formState]);

  let items = [];

  function confirm() {

    
    let quiz = {
      name : formState.name,
      text : formState.text,
      questions : questionList
    }
    db.collection("quices")
    .add(quiz)
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        setShow(true)
    })
    .catch((error) => {
        setError(true);
        console.error("Error adding document: ", error);
    });
  }

  const handleEdit = (index) => {
    let tempQuestionList = [];
    for (let i = 0; i < questionList.length; i++) {
      if (i !== index) {
        tempQuestionList.push(questionList[i]);
      }
    }
    setQuestionList(tempQuestionList);
  };


  const handleReturn = () => {
    history.push("/manageQuiz");
}

  return (
    <Fragment>
      <div
        id="card"
        className=" ml-5 mt-3 card mx-auto border-info"
        style={{ width: "60rem" }}
      >
        <div id="form">
          <div class="row">
            <label className="text-center" id="tittle">
              Añadir Quiz.
            </label>
            <div className="form-group col-md-4 m-2">
              <label style={{ fontSize: "40px" }}>Nombre:</label>

              <input
                onChange={handleNameAndText}
                value={name}
                name="name"
                type="text"
                placeholder="Añada un nombre"
                className="form-control mt-3"
              ></input>
            </div>

            <div className="form-group col-md-4 m-2">
              <label style={{ fontSize: "40px" }}>Texto </label>

              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                onChange={handleNameAndText}
                value={text}
                name="text"
                type="text"
                placeholder="Añada el texto del quiz"
                className="form-control mt-3"
              ></textarea>
            </div>
            <div className="form-group col-md-4 m-2">
              <label style={{ fontSize: "40px" }}>Pregunta</label>

              <input
                onChange={(e) => handleQuestionChange(e.target, -1)}
                value={question}
                name="question"
                type="text"
                placeholder="Añada una pregunta"
                className="form-control mt-3"
              ></input>
            </div>

            <div className="form-group col-md-4 m-2">
              <label style={{ fontSize: "40px" }}>Opciones</label>
              <label> Opcion correcta</label>
              <input
                onChange={(e) => handleQuestionChange(e.target, 0)}
                value={options[0]}
                name="question"
                type="text"
                placeholder="Añada la respuesta"
                className="form-control mt-3"
              ></input>

              <label> Opciones incorrectas</label>
              <input
                onChange={(e) => handleQuestionChange(e.target, 1)}
                value={options[1]}
                name="question"
                type="text"
                placeholder="Añada una opción incorrecta"
                className="form-control mt-3"
              ></input>

              <input
                onChange={(e) => handleQuestionChange(e.target, 2)}
                value={options[2]}
                name="question"
                type="text"
                placeholder="Añada una opción incorrecta"
                className="form-control mt-3"
              ></input>
            </div>

            <div className="form-group col-md-12 mt-4 ">
              <button
                onClick={addQuestion}
                className="btn-AddQuizz btn-block mb-2"
              >
                Añadir pregunta
              </button>
              <button
                onClick={confirm}
                className="btn-ConfirmQuizz btn-block "
              >
                Confirmar Quiz
              </button>
              <button onClick={handleReturn} className="btn-block btn-ReturnQuizz">
                        Regresar
                    </button>
            </div>

        
          </div>

          {formState.name== "" ? (
            <tr> </tr>
             ) : (<div>  <label  style={{ fontWeight: "bold" }}>Nombre del quiz</label> {formState.name} </div>)
        
        }

            {questionList[0] == "" ? (
            <tr> </tr> ) : ( 
            questionList.map((element, index) => (
              <div  key={element.index}>
                

                <div>
                  {" "}
                  <label style={{ fontWeight: "bold" }}>
                    {index + 1}-Pregunta:{" "}
                  </label>{" "}
                  {element.question}{" "}
                  <button
                    onClick={(e) => handleEdit(index)}
                    style={{ marginLeft: "15px" }}
                    className="btn-sm btn-Delete"
                  >
                    Eliminar
                  </button>
                </div>
                <div style={{ marginLeft: "25px" }}>
                  {" "}
                  <label style={{ fontWeight: "bold", color: "green" }}>
                    Respuesta correcta:{" "}
                  </label>{" "}
                  {element.options[0]}
                </div>
                <div style={{ marginLeft: "25px" }}>
                  {" "}
                  <label style={{ fontWeight: "bold", color: "red" }}>
                    Respuesta incorrecta:{" "}
                  </label>{" "}
                  {element.options[1]}
                </div>
                <div style={{ marginLeft: "25px" }}>
                  {" "}
                  <label style={{ fontWeight: "bold", color: "red" }}>
                    Respuesta incorrecta:{" "}
                  </label>{" "}
                  {element.options[2]}
                </div>
              </div>
            ))
          )}
        </div>


      

      </div>
      <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>¡Elemento agregado con exito!</Modal.Title>
                        </Modal.Header>
                        <Modal.Footer>
                            <Button variant="success" onClick={handleClose}>
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

    </Fragment>
  );
};

export default AddQuiz;
