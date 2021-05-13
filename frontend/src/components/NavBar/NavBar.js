import React from "react";
import './NavBar.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Historial from './../Historial/Historial';



function NavBar() {
  
    return (
      <Router>
      <div>
        <div>
          <Link to="/">Inicio</Link>
          <Link to="/historial">Historial</Link>
         
        </div>
        <hr />
        <Switch>
          <Route path="/" exact>
            
          </Route>
          <Route path="/historial">
            <Historial />
          </Route>
          
        </Switch>
      </div>
    </Router>
    );
  

}

export default NavBar;