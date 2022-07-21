import React from 'react'

const VirtualPath = () => {
  const image = "/assets/RecorridoVirtual.png";

    function redirect() {
   
    window.open("https://bosquedemostrativo.wixsite.com/pano360", '_blank');
   }

  return (
    <div class="container mt-2">
      <div className="row centrar-contenedor  ">

      <div className="col-12 centrar-contenedor">
                        <label id="tittle" for="tittle">
                            ¡Tenemos disponible un recorrido virtual!{" "}
                        </label>
                    </div>

        <div className="mt-1 row-details col-lg-12 ">
          <img src={image} className="card-img centrado img-recorrido " alt={image}></img>
        </div>
      
      
      </div>
      
      <div className="div-row-details centrar-contenedor  mt-5">
      <button onClick={redirect} className='h5-text btn btn-outline-success centrado ' >
                                ¡Empezar recorrido virtual!
      </button>   
      
      </div>
   


        
     
    </div>
  );
};

export default VirtualPath;
