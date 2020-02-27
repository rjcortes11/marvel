import React from 'react';
import { NavLink } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import IconNoFavorite from '@material-ui/icons/FavoriteBorder';
import IconFavorite from '@material-ui/icons/Favorite';
import IconHome from '@material-ui/icons/Home';
import IconSearch from '@material-ui/icons/Search';

import { connect } from 'react-redux';
import { setShowFavoritesAction } from '../../redux/storyDuck';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '10px 10px',
    display: 'flex',
    alignItems: 'center',
    width: 200,
  },
  iconButton: {
    padding: 10,
  },
}));

const StoriesMenu = ({ showFavorites, setShowFavoritesAction }) => {
  const classes = useStyles();
  let changeShow = (event, newShowFlag) => {
    setShowFavoritesAction(newShowFlag);
  };

  return (
    <>
      <Paper component='form' className={classes.root} elevation={2}>
        <NavLink className='link' activeClassName='active' to='/'>
          <IconButton className={classes.iconButton} aria-label='menu'>
            <IconHome color='primary' />
          </IconButton>
        </NavLink>
        <ToggleButtonGroup size='medium' value={showFavorites} exclusive onChange={changeShow}>
          <ToggleButton key={1} value={false}>
            <IconNoFavorite color='primary' />
          </ToggleButton>
          <ToggleButton key={2} value={true}>
            <IconFavorite color='primary' />
          </ToggleButton>
        </ToggleButtonGroup>
        <IconButton className={classes.iconButton} aria-label='search' disabled>
          <IconSearch />
        </IconButton>
      </Paper>
      <br />
    </>
  );
};

function mapState({ story }) {
  return {
    showFavorites: story.showFavorites,
  };
}

export default connect(mapState, {
  setShowFavoritesAction,
})(StoriesMenu);
