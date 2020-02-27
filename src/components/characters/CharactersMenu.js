import React from 'react';
import { NavLink } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import IconNoFavorite from '@material-ui/icons/FavoriteBorder';
import IconFavorite from '@material-ui/icons/Favorite';
import IconHome from '@material-ui/icons/Home';
import IconSearch from '@material-ui/icons/Search';

import { connect } from 'react-redux';
import { setShowFavoritesAction } from '../../redux/characterDuck';

const CharactersMenu = ({ showFavorites, setShowFavoritesAction }) => {
  let changeShow = (event, newShowFlag) => {
    setShowFavoritesAction(newShowFlag);
  };

  return (
    <Grid container elevation={0} spacing={2} direction='column' alignItems='center'>
      <Grid item>
        <ToggleButtonGroup size='medium' value={showFavorites} exclusive onChange={changeShow}>
          <NavLink className='link' activeClassName='active' to='/'>
            <ToggleButton key={0} value={false} border={1}>
              <IconHome color='primary' />
            </ToggleButton>
          </NavLink>
          {'    '}
          <ToggleButton key={1} value={false} border={2}>
            <IconNoFavorite color='primary' />
          </ToggleButton>
          <ToggleButton key={2} value={true} border={3}>
            <IconFavorite color='primary' />
          </ToggleButton>
          {'    '}
          <NavLink className='link' activeClassName='active' to='/'>
            <ToggleButton key={4} value={false} border={1}>
              <IconSearch color='primary' />
            </ToggleButton>
          </NavLink>
        </ToggleButtonGroup>
      </Grid>
    </Grid>
  );
};

function mapState({ character }) {
  return {
    showFavorites: character.showFavorites,
  };
}

export default connect(mapState, {
  setShowFavoritesAction,
})(CharactersMenu);
