import React, { lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { getMoreCharactersAction } from '../../redux/characterDuck';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';

import { Waypoint } from 'react-waypoint';
const Spinner = lazy(() => import('../commons/Spinner'));
const CharactersSummary = lazy(() => import('./CharactersSummary'));
const CharactersMenu = lazy(() => import('./CharactersMenu'));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
}));

const CharactersMain = ({ chars, fetching, getMoreCharactersAction, favoritesList, showFavorites }) => {
  const classes = useStyles();
  const loading = <Skeleton animation='wave' width={200} height={380} style={{ margin: 2 }} />;
  let listShow = [];

  if (showFavorites) {
    listShow = favoritesList;
  } else {
    listShow = chars;
  }

  let moreCharacter = () => {
    getMoreCharactersAction();
  };

  return (
    <>
      <center>
        <h2>CHARACTERS</h2>
        <CharactersMenu />
      </center>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify='center' spacing={2}>
            {listShow.map((char, index) => (
              <Suspense fallback={loading} key={char.id}>
                <CharactersSummary index={index} key={char.id} />
              </Suspense>
            ))}
          </Grid>
          {fetching ? <Spinner /> : null}
          {showFavorites ? null : <Waypoint onEnter={() => moreCharacter()} />}
          {fetching === false && Object.keys(listShow).length === 0 ? (
            <h4 align='center'>Sorry, no comics available. Try again...</h4>
          ) : null}
        </Grid>
      </Grid>
    </>
  );
};

function mapState({ character }) {
  return {
    chars: character.array,
    fetching: character.fetching,
    favoritesList: character.favorites,
    showFavorites: character.showFavorites,
  };
}

export default connect(mapState, {
  getMoreCharactersAction,
})(CharactersMain);
