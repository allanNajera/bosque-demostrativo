import React from "react";
import { useHistory } from "react-router-dom";
import "../../globalStyles.css";


const SeeText = (elementE) => {

  const history = useHistory();

  const handleReturn = () => {
    history.push("/SelectQuiz");
  };

 

  const quiz = elementE.location.state;



  const handleStartQuiz = (element) =>{
    console.log("el elemento es:", element);

    history.push({ pathname: '/AnswerQuestions',state:  element });
  }

  return (
    <div
      id="card"
      className="ml-5 mt-3 card mx-auto border-info"
      style={{ width: "90rem" }}
    >
      <div class="row">
        <div className="col-12 centrar-contenedor">
          <label id="tittle" for="tittle">
            Tema: {quiz.data.name}
          </label>
        </div>
      </div>

      <h5 className="m-3">{quiz.data.text}</h5>

      <div className="p-3 ">
        <div className="centrar-contenedor  ">
          <button  onClick={(e) => handleStartQuiz(quiz)} className="btn btn-outline-success ">
            ¡Mide tu conocimiento respondiendo preguntas!
          </button>

          <button className="btn ml-3 btn-outline-info " onClick={handleReturn}>
            Regresar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeeText;
