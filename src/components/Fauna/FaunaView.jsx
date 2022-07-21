import React, { useEffect, useState } from 'react';
import { db } from "../../firebase";
import FaunaList from './FaunaList';
import "../../globalStyles.css";



const FaunaView = () => {


    let elementosFauna = [];


    const [loading, setLoading] = useState(true);

    const [elementosFaunaHtml, setelementosFaunaHtml] = useState(<div>pera</div>);




    function cargarDB() {


        db.collection("fauna").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                //setFaunaList([...faunaList,{id:doc.id,data: doc.data()}] )
                elementosFauna.push({ id: doc.id, data: doc.data() })
            });

            setelementosFaunaHtml(elementosFauna);


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



            {loading ? <div> </div> : elementosFaunaHtml.map(element =>

                <FaunaList
                key={element.id}
                id={element.id}
                name={element.data.name}
                description={element.data.description}
                img={element.data.imageUrl}/>
            )}
        </div>
    )
}

export default FaunaView