import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import "../../globalStyles.css";

const QuizList = ({ element }) => {

    const history = useHistory();
    const [elementState, setelementState] = useState(element);


    function handleStart() {

     
        let rightAnswers = [];
        console.log("antes de guardar",element);
        for (let index = 0; index < element.data.questions.length; index++) {
          rightAnswers.push(element.data.questions[index].options[0]);
        }
        
        console.log(rightAnswers);
       
       element= {...element,rightAnswers}

       history.push({ pathname: '/AnswerQuestions',state:  element });

    }

    return (
        <div className='col animate__animated animate__fadeIn mt-2'>
            <div className="card card-width ">

                <div className="col no-gutters ">
                    
                    <div className="row-6 card-body  ">
                        <h5 className="card-title center-text " >{element.data.name}</h5>
                        <div className="centrar-contenedor ">
                            <button onClick={(e) => handleStart()} className='h5-text btn btn-outline-dark ' >
                                Empezar
                            </button>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default QuizList;