import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import Footer from "./footer/Footer"
import Navbar from "./Navbar/Navbar"


export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth()

  return (
    
    
    <Route
      {...rest}
      render={props => {
        return currentUser ? <div> <div><Navbar {...props}/> <div className="body-complete "><Component {...props} /> </div> </div> <div><Footer/> </div> </div>  : <Redirect to="/login" />
      }}
    ></Route>
    
  )
}
