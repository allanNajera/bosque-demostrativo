import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import UpdateProfile from "./UpdateProfile";
import AddFlora from "./Flora/AddFlora";
import "../App.css";

import "./globalStyles.css";
import { ManageFlora } from "./Flora/ManageFlora";
import EditFlora from "./Flora/EditFlora";
import FaunaScreen from "./Fauna/FaunaScreen";
import EditFauna from "./Fauna/EditFauna";
import { ManageFauna } from "./Fauna/ManageFauna";
import AddReciclaje from "./Reciclaje/AddReciclaje";
import { ManageReciclaje }  from "./Reciclaje/ManageReciclaje";
import EditReciclaje from "./Reciclaje/EditReciclaje";
import Bienvenida from "./Bienvenida/bienvenida";
import FaunaView from "./Fauna/FaunaView";
import FloraView from "./Flora/FloraView";

import PublicRoute from "./PublicRoute";
import ReciclajeView from "./Reciclaje/ReciclajeView";

import AddQuiz from "./Quices/AddQuiz";
import FaunaDetail from "./Fauna/FaunaDetail";
import FloraDetails from "./Flora/FloraDetails";
import ReciclajeDetails from "./Reciclaje/ReciclajeDetails";
import BosqueDemostrativo from "./bosqueDemostrativo/BosqueDemostrativo";
import { ManageQuiz } from "./Quices/ManageQuiz";
import { SelectQuiz } from "./Quices/SelectQuiz";
import SeeText from "./Quices/SeeText";
import AnswerQuestions from "./Quices/AnswerQuestions";
import SeeResults from "./Quices/SeeResults";
import AddFile from "./Pdfs/addFile";
import { ManageFiles } from "./Pdfs/ManageFiles";
import { SeeFiles } from "./Pdfs/SeeFiles";
import VirtualPath from "./Virtualpath/Virtualpath";



function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Switch>
            {/* rutas privadas */}
            <PrivateRoute exact path="/" component={Bienvenida} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <PrivateRoute exact path="/addFlora" component={AddFlora} />
            <PrivateRoute exact path="/ManageFlora" component={ManageFlora} />
            <PrivateRoute exact path="/EditFlora" component={EditFlora} />

            <PrivateRoute exact path="/addpracticas-saludables" component={AddReciclaje}/>
            <PrivateRoute exact path="/managepracticas-saludables" component={ManageReciclaje}/>
            <PrivateRoute exact path="/Editpracticas-saludables"component={EditReciclaje}/>

            <PrivateRoute exact path="/addFauna" component={FaunaScreen } />
            <PrivateRoute exact path="/editFauna" component={EditFauna } />
            <PrivateRoute exact path="/manageFauna" component={ManageFauna } />
            <PrivateRoute exact path="/manageQuiz" component={ManageQuiz } />
           
            <PrivateRoute exact path="/addQuiz" component={AddQuiz } />
            <PublicRoute  exact path="/SelectQuiz" component={SelectQuiz} />
            <PublicRoute  exact path="/SeeText" component={SeeText} />
            <PublicRoute  exact path="/AnswerQuestions" component={AnswerQuestions} />
            <PublicRoute  exact path="/SeeResults" component={SeeResults} />


            <PublicRoute  exact path="/SeeFiles" component={SeeFiles} />


            <PrivateRoute path="/AddFile" component={AddFile} />
            <PrivateRoute path="/ManageFiles" component={ManageFiles} />
           
           
            <PublicRoute path="/fauna" component={FaunaView} />
            <PublicRoute path="/flora" component={FloraView} />
            <PublicRoute path="/practicas-saludables" component={ReciclajeView} />
            <PublicRoute path="/detalles-fauna" component={FaunaDetail} />
            <PublicRoute path="/detalles-flora" component={FloraDetails} />
            <PublicRoute path="/detalles-practicas-saludables" component={ReciclajeDetails} />
            <PublicRoute path="/bosqueDemostrativo" component={BosqueDemostrativo} />
            <PublicRoute path="/RecorridoVirtual" component={VirtualPath} />

            




            <PrivateRoute exact path="/AddQuiz" component={AddQuiz} />

            <Route path="/login" component={Login} />

          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
