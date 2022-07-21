
import "../../globalStyles.css";
import React, { useState, useEffect } from "react";

import { db } from "../../firebase"

import { useAuth } from "../../contexts/AuthContext"

import { useHistory } from "react-router-dom";

import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import QuizList from "./QuizList";


export const SelectQuiz = () => {

    const { currentUser, logout } = useAuth()

    const history = useHistory()

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    function handleEdit(element, event) {

        console.log("el elemento es:", element);

        history.push({ pathname: '/SeeText',state:  element });
    }
     //randomize vector

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



    
    function handleStart(element, event) {
        
        let rightAnswers = [];
        console.log("antes de guardar",element);
        for (let index = 0; index < element.data.questions.length; index++) {
          rightAnswers.push(element.data.questions[index].options[0]);
        }
        
        console.log(rightAnswers);
       
       element= {...element,rightAnswers}

       history.push({ pathname: '/AnswerQuestions',state:  element });
    }


    

    let quices = [];

    let lista = "";

    const [loading, setLoading] = useState(true);

    const [quicesHtml, setquicesHtml] = useState(<div>pera</div>);


    
   


    function cargarDB() {


        db.collection("quices").get().then((querySnapshot) => {
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




    return (
        <div>
     
               <div className="col-12 centrar-contenedor mt-2">
                        <label id="tittle" for="tittle">
                            ¡Seleccione un tema!{" "}
                        </label>
                    </div>
        
        <div className="row no-gutters rows-cols-1 row-cols-md-3 g-3 mt-2 product-image-container ">


            {loading ? <div> </div> : quicesHtml.map(element =>

                <QuizList
                    key={element.id}
                    element= {element}
                    
                 > </QuizList>
            )}
        </div>
        </div>
    )
}


