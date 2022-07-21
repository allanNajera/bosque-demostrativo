import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import Footer from "./footer/Footer"
import Navbar from "./Navbar/Navbar"
import NavbarPublic from "./Navbar/NavbarPublic"


export default function PublicRoute({ component: Component, ...rest }) {

  return (
    
    
    <Route
      {...rest}
      render={props => {
        return <div> <div><NavbarPublic {...props}/> <div className="body-complete "><Component {...props} /> </div> </div> <div><Footer/> </div> </div> 
      }}
    ></Route>
    
  )
}
