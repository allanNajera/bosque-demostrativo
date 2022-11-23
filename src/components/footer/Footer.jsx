import React from 'react';
import "../../globalStyles.css";

const Footer = () => {
    const imageFooter = '/assets/ucr_promo.png';
    const imageFacebook = '/assets/facebook.png';
    const imageUCR = '/assets/ucr_promo.png';

  return (
    <div>
         <footer className='footer ' >
                <div className='footerImg'>
                    <img src={imageFooter} ></img>
                    <h3>Universidad de Costa Rica</h3>
                    <h3>Tel. 2511-7000.</h3>
                    <a title="Bosque demostrativo" href="https://www.facebook.com/BosqueDemostrativoSO"><img src={imageFacebook} alt="Facebook" className='icon '/></a>
                    <a title="Red de Áreas Protegidas" href="http://www.rap.ucr.ac.cr/areas-protegidas/reserva-ecologica-sede-de-occidente-reso"><img src={imageUCR} alt="RAP" className='icon '/></a>
                    <a title="Museo UCR" href="http://museo.ucr.ac.cr/catalogo/colecvivas/7bosqdemo.html"><img src={imageUCR} alt="Museo UCR" className='icon '/></a>
                </div>
            </footer>
    </div>
  )
}

export default Footer