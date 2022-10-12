import React from 'react'



const BosqueDemostrativo = () => {
  const image = '/assets/BosqueDemotrativo1.jpeg';
  const image2 = '/assets/BosqueDemostrativo2.jpeg';
  const image3 = '/assets/BosqueDemostrativo3.jpeg';
  const image4 = '/assets/BosqueDemostrativo4.jpeg';
  const image5 = '/assets/BosqueDemostrativo5.jpeg';
  const image6 = '/assets/BosqueDemostrativo6.jpeg';
  const image7 = '/assets/BosqueDemostrativo7.jpeg';
  const image8 = '/assets/BosqueDemostrativo8.jpeg';




  return (
    <div className="row mx-auto centrar-contenedor">
      <div className="col-10 ">

      <div class="container mt-2">
      <div className="row centrar-contenedor  ">

      <div className="col-12 centrar-contenedor">
                        <label id="tittle" for="tittle">
                            Módulo de administrador{" "}
                        </label>
                    </div>
                    </div>
                    </div>

        <div className='mt-3 center-text ' >
          <div><h3 className='h3-details ' >Bosque demostrativo</h3></div>
        </div>

        <div >
          <p className='center-justify p-details'>La Reserva Ecológica de la Sede de Occidente (RESO), cuenta con la zona Bosque Demostrativo. El sector Bosque Demostrativo está ubicado estratégicamente en el corredor interurbano de San Ramón, este tiene una extensión total de 1 hectárea y 308 metros. Cuenta con senderos de cementos que recorren alrededor de 900 metros, además tiene una variedad de árboles forestales representando a la zona de vida del bosque húmedo pre-montano. Este pulmón de la ciudad de San Ramón, posee el modulo didáctico de ecología, anfiteatro, pasa parte de la quebrada estero, modelos de prácticas sostenibles, además tiene otros servicios en el conjunto de aulas 100, como lo son los baños y estacionamiento.
          </p>
        </div>

        <div>
          <h5>
            ¿Quieres Visitar el Bosque demostrativo?
          </h5>
          <p className='center-justify p-details'>
            Para visitar el Bosque Demostrativo se requiere de una previa cita, para obtenerla se puede comunicar a los números de teléfono 2511-7117 o bien, al 8837-5790, este mismo se encuentra ubicado 1 km al oeste del Banco Nacional en San Ramón Centro, dentro del caserío San Pedro, distrito Alfaro.
          </p>
        </div>

        <div>
          <h5>
            Historia del Bosque Demostrativo
          </h5>
          <p className='center-justify p-details ' >
            La idea del Bosque Demostrativo nació de la Profesora Sonia Delgado Quesada para optar por el título de Licenciatura en Biología, Escuela de Biología, Facultad de Ciencias Naturales, Universidad de Costa Rica, San José, Costa Rica año 1986,  cuyo aporte principal fue el de restituir el terreno sin bosque adjunto a la Sede, sembrando árboles que provinieron de los bosques representativos del cantón, tales como: los existentes en las comunidades de San Isidro, Las Musas y Piedades Sur. Este bosque es la base del proyecto de trabajo comunal universitario (TCU) del proyecto número TC-517 y en el pasado su gestora lo inscribió como proyecto de Extensión Docente "Complejo Natural Educativo y Recreativo: Bosque Demostrativo de la Sede de Occidente". Desde el año 2005, el bosque demostrativo ha sido modalidad de Trabajo Comunal Universitario. A partir de ese año hasta la actualidad se ha incluido la interdisciplinariedad con la participación de estudiantes de varias carreras en busca de los mejores beneficios para el mismo.
          </p>
        </div>

        <div>
         
        </div>
        <div className="div-row-details centrar-contenedor  ">

          <div className='row-details col-lg-4 '>
            <img src={image} className="card-img cat centrado " alt={image}></img>
          </div>

          <div className='row-details col-lg-4 '>
            <img src={image2} className="card-img cat centrado " alt={image2}></img>
          </div>

          <div className='row-details col-lg-4 '>
            <img src={image3} className="card-img cat centrado " alt={image3}></img>
          </div>

        </div>

        <div className="div-row-details centrar-contenedor mt-3  ">

          <div className='row-details col-lg-4 '>
            <img src={image4} className="card-img cat centrado " alt={image}></img>
          </div>

          <div className='row-details col-lg-4 '>
            <img src={image5} className="card-img cat centrado " alt={image2}></img>
          </div>

          <div className='row-details col-lg-4 '>
            <img src={image6} className="card-img cat centrado " alt={image3}></img>
          </div>

        </div>

      </div>
    </div>
  )
}

export default BosqueDemostrativo