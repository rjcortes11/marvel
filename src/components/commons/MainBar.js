import React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import SaldosIcon from "@material-ui/icons/InsertChart";
import ServiciosIcon from "@material-ui/icons/FormatListBulleted";
import MonedAzulIcon from "@material-ui/icons/MonetizationOn";

const MainBar = () => {
  return (
    <Drawer variant="permanent">
      <List>
        <ListItem button key="saldos">
          <ListItemIcon>
            <SaldosIcon />
          </ListItemIcon>
          <ListItemText primary="Saldos" />
        </ListItem>
        <ListItem button key="servicios">
          <ListItemIcon>
            <ServiciosIcon />
          </ListItemIcon>
          <ListItemText primary="Servicios" />
        </ListItem>
        <ListItem button key="monedazul">
          <ListItemIcon>
            <MonedAzulIcon />
          </ListItemIcon>
          <ListItemText primary="MonedAzul" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default MainBar;
