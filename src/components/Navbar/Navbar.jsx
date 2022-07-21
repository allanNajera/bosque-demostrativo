import React, { useState } from "react"
import { Link, NavLink } from 'react-router-dom'
import '../../globalStyles.css'

import { useHistory } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext"



const Navbar = () => {
    
   
    const { currentUser, logout } = useAuth()
    const [error, setError] = useState("")

    const history = useHistory()

    const imagePath = '/assets/firma-horizontal-una-linea.png';
    
    function handleClick(event) {

        console.log(event.target.value);
        
        history.push('/'+ event.target.value );
      }

      async function handleLogout() {
        setError("")
    
        try {
          await logout()
          history.push("/login")
        } catch {
          setError("Failed to log out")
        }
      }


      return (


        <div>

            <div className='cintillo et_pb_row '>
                <img src={imagePath} ></img>
            </div>

            <nav className="navbar navbar-expand-sm nav ">

                <Link
                    className="nav-item nav-link link "
                    to="/"
                >
                    Bosque Demostrativo
                </Link>

                <div className="navbar-collapse ">




                    <div className="navbar-nav ">

                        <NavLink
                            className="nav-item nav-link link "
                            to="/manageFlora"
                        >
                            Flora
                        </NavLink>

                        <NavLink
                            className="nav-item nav-link link "
                            to="/managepracticas-saludables"
                        >
                            Prácticas Saludables
                        </NavLink>
                 
                        <NavLink
                            className="nav-item nav-link link "
                            to="/manageFauna"
                        >
                            Fauna
                        </NavLink>
                        <NavLink
                            className="nav-item nav-link link "
                            to="/manageQuiz"
                        >
                            Quices
                        </NavLink>

                        <NavLink
                            className="nav-item nav-link link "
                            to="/ManageFiles"
                        >
                            Archivos
                        </NavLink>
                

                </div></div>

                <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                    <ul  className="nav-item nav-link link navbar-nav ml-auto " style={{cursor:"pointer"}}  onClick={handleLogout} >
                    <ul  className="nav-item nav-link link " style={{cursor:"pointer"}}  onClick={handleLogout}/>
                        
                            Cerrar sesión
                       
                    </ul>

                </div>


            </nav>

           

        </div>
    )
};

export default Navbar;