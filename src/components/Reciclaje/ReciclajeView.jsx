import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { db, storage, storageRef } from "../../firebase";
import "../../globalStyles.css";
import ReciclajeList from './ReciclajeList';



const ReciclajeView = () => {


    const history = useHistory();


    let elementosReciclaje = [];


    const [loading, setLoading] = useState(true);

    const [elementosReciclajeHtml, setelementosReciclajeHtml] = useState(<div>Reciclaje</div>);




    function cargarDB() {


        db.collection("reciclaje").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                //setReciclajeList([...ReciclajeList,{id:doc.id,data: doc.data()}] )
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




    return (
        <div className="row no-gutters  rows-cols-1 row-cols-md-3 g-3 mt-3 product-image-container animate__animated animate__fadeIn ">



            {loading ? <div> </div> : elementosReciclajeHtml.map(element =>

                <ReciclajeList
                key={element.id}
                id={element.data.id}
                name={element.data.name}
                description={element.data.description}
                videoUrl={element.data.videoUrl}/>
            )}
        </div>
    )
}

export default ReciclajeView