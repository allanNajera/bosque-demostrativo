import React, { useState } from "react"
import { Link, NavLink } from 'react-router-dom'
import '../../globalStyles.css'

const NavbarPublic = () => {


    const imagePath = '/assets/firma-horizontal-una-linea.png';


    return (


        <div>

            <div className='cintillo '>
                <img className="cintillo-img et_pb_row  " src={imagePath} ></img>
            </div>

            <nav className="navbar navbar-expand-sm nav ">

                <div className="navbar-collapse">

                    <div className="navbar-nav ">


                        <NavLink
                            className="nav-item nav-link link "
                            to="/bosqueDemostrativo"
                        >
                            Bosque Demostrativo
                        </NavLink>

                        <NavLink
                            className="nav-item nav-link link "
                            to="/flora"
                        >
                            Flora
                        </NavLink>


                        <NavLink
                            className="nav-item nav-link link "
                            to="/fauna"
                        >
                            Fauna
                        </NavLink>

                        <NavLink
                            className="nav-item nav-link link "
                            to="/practicas-saludables"
                        >
                            Prácticas saludables
                        </NavLink>

                        
                        <NavLink
                            className="nav-item nav-link link "
                            to="/RecorridoVirtual"
                        >
                            Recorrido Virtual
                        </NavLink>

                        <NavLink
                            className="nav-item nav-link link "
                            to="/SelectQuiz"
                        >
                            Aprende y mide tu conocimiento
                        </NavLink>

                        <NavLink
                            className="nav-item nav-link link "
                            to="/SeeFiles"
                        >
                  
                            Artículos y Guías didácticas
                        </NavLink>



                    </div></div>


            </nav>



        </div>
    )
};

export default NavbarPublic;