import React, { useEffect, useState } from 'react';
import { db } from "../../firebase";
import FloraList from './FloraList';
import "../../globalStyles.css";


const FloraView = () => {


    let elementosFlora = [];

    let elementosFloraM = [];

    let elementosFloraF = [];

    const [loading, setLoading] = useState(true);

    const [elementosFloraMedicinalesHtml, setelementosFloraMedicinalesHtml] = useState(<div>medicinales</div>);

    const [elementosForestalesFloraHtml, setelementosFloraForestalesHtml] = useState(<div>forestales</div>);

    const [elementosFloraHtml, setelementosFloraHtml] = useState(<div>medicinales</div>);


    function cargarDB() {


        db.collection("flora").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                //setFaunaList([...faunaList,{id:doc.id,data: doc.data()}] )
                elementosFlora.push({ id: doc.id, data: doc.data() })
            });

            console.log(elementosFlora);

            for (let i = 0; i < elementosFlora.length; i++) {
                if (elementosFlora[i].data.type === "medicinales") {
                    elementosFloraM.push(elementosFlora[i]);
                } else if (elementosFlora[i].data.type === "forestales") {
                    elementosFloraF.push(elementosFlora[i]);
                }
            }

            setelementosFloraMedicinalesHtml(elementosFloraM);

            setelementosFloraForestalesHtml(elementosFloraF);

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
            { elementosFloraMedicinalesHtml.length >0 && <div>
                <div className='mt-3 center-text '>
                    <h5>Plantas Medicinales</h5>
                </div>
                <div>
                    <div className="row no-gutters rows-cols-1 row-cols-md-3 g-3 mt-2 product-image-container ">
                        {loading ? <div> </div> : elementosFloraMedicinalesHtml.map(element =>

                            <FloraList
                                key={element.id}
                                id={element.data.id}
                                name={element.data.name}
                                description={element.data.description}
                                biology={element.data.biology}
                                traditionalUse={element.data.traditionalUse}
                                img={element.data.imageUrl} />
                        )}
                    </div>
                </div>
            </div>}

            { elementosForestalesFloraHtml.length >0 && <div>
                <div className='mt-5 center-text '>
                    <h5>Plantas Forestales</h5>
                </div>
                <div>
                    <div className="row no-gutters rows-cols-1 row-cols-md-3 g-3 mt-2 product-image-container ">
                        {loading ? <div> </div> : elementosForestalesFloraHtml.map(element =>

                            <FloraList
                                key={element.id}
                                id={element.data.id}
                                name={element.data.name}
                                description={element.data.description}
                                biology={element.data.biology}
                                traditionalUse={element.data.traditionalUse}
                                img={element.data.imageUrl} />
                        )}
                    </div>
                </div>
            </div>}

        </div>

    )
}

export default FloraView