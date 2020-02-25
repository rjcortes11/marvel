import React from "react";
import logo from "../../logo.svg";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar variant="regular">
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          color="inherit"
          align="center"
          className={classes.title}
        >
          <NavLink className="link" activeClassName="active" exact to="/">
            {/* 
            //TODO: Habilitar el logo nuevamente 
            <img src={logo} width="90" alt="logo" /> 
            */}
          </NavLink>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
