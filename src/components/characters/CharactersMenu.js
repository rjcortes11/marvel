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
import { setShowFavoritesAction } from '../../redux/characterDuck';

const CharactersFilter = React.lazy(() => import('./CharactersFilter'));

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

const CharactersMenu = ({ showFavorites, setShowFavoritesAction }) => {
  const [openSearch, setOpenSearch] = React.useState(false);
  const classes = useStyles();

  let showSearch = () => {
    setOpenSearch(!openSearch);
  };

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
        <IconButton className={classes.iconButton} aria-label='search' onClick={() => showSearch()}>
          <IconSearch />
        </IconButton>
      </Paper>
      <br />
      <CharactersFilter open={openSearch} setOpen={setOpenSearch} />
    </>
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
