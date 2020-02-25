import React from "react";
import { NavLink } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    maxWidth: 300
  },
  media: {
    height: 300,
    // width: '900%',
    maxWidth: 300
  },
  actionArea: {
    alignItems: "center",
    alignContent: "center",
    textAlign: "center"
  }
});

const HomeDetail = ({ thumbnail, title, link }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root} raised={true}>
      <CardHeader
        title={title}
      />
      <CardActionArea>
        <NavLink className="link" activeClassName="active" to={link}>
          <CardMedia
            className={classes.media}
            spacing={1}
            image={thumbnail}
            src="picture"
            title={title}
          />
        </NavLink>
      </CardActionArea>
      <CardActions className={classes.root}>
        <Button size="small" color="primary">
          See All
        </Button>
        <Button size="small" color="primary">
          See Favorities
        </Button>
      </CardActions>
    </Card>
  );
};

export default HomeDetail;
