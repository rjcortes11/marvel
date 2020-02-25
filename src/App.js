import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./helpers/MainStyles";
import Routes from "./Routes";
import Header from "./components/commons/Header";
import MainBar from "./components/commons/MainBar";

function App() {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Header />
      {/* 
      //TODO: Realizar el menu desplegable
      <MainBar /> 
      <NavLink className="link" activeClassName="active" exact to="/">
        Inicio
      </NavLink>
      <br />
      <NavLink className="link" activeClassName="active" to="/comics">
        Comics
      </NavLink>
      <br />
      <NavLink className="link" activeClassName="active" to="/characters">
        Characters
      </NavLink>
      <br />
      <NavLink className="link" activeClassName="active" to="/stories">
        Stories
      </NavLink>
      */}
      <Routes />
    </>
  );
}

export default withStyles(styles, { withTheme: true })(App);
