import React from "react";
import HomeDetails from "./HomeDetail";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    alignItems: "center",
    alignContent: "center",
    textAlign: "center"
  }
}));
const Home = () => {
  const classes = useStyles();
  return (
    <>
    <br />
      <Container >
        <div className={classes.root}>
          <Grid container spacing={1} alignItems="center" justify="center" alignContent='center' >
            <Grid item xs={9} sm={6} md={4}>
              <HomeDetails
                id="Comics"
                title="Comics"
                link='/comics'
                thumbnail="https://i.annihil.us/u/prod/marvel/i/mg/9/50/5e4c363549aca/portrait_fantastic.jpg"
              />
            </Grid>
            <Grid item xs={9} sm={6} md={4}>
              <HomeDetails
                id="Characters"
                title="Characters"
                link='/characters'
                thumbnail="http://x.annihil.us/u/prod/marvel/i/mg/3/40/4bb4680432f73/portrait_fantastic.jpg"
              />
            </Grid>
            <Grid item xs={9} sm={6} md={4}>
              <HomeDetails
                id="Stories"
                title="Stories"
                link='/stories'
                thumbnail="https://i.annihil.us/u/prod/marvel/i/mg/4/20/5e4c3648529d7/portrait_fantastic.jpg"
              />
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default Home;
