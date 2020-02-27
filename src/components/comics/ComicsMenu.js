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
import { setShowFavoritesAction } from '../../redux/comicDuck';

const ComicsFilter = React.lazy(() => import('./ComicsFilter'));

const ComicsMenu = ({ showFavorites, setShowFavoritesAction }) => {
  const [openSearch, setOpenSearch] = React.useState(false);

  let showSearch = () => {
    setOpenSearch(!openSearch);
  };

  let changeShow = (event, newShowFlag) => {
    setShowFavoritesAction(newShowFlag);
  };

  return (
    <>
      <Grid container spacing={2} direction='column' alignItems='center'>
        <Grid item>
          <ToggleButtonGroup size='medium' value={showFavorites} exclusive onChange={changeShow}>
            <NavLink className='link' activeClassName='active' to='/'>
              <ToggleButton key={0} value={false} border={1}>
                <IconHome color='primary' />
              </ToggleButton>
            </NavLink>
            {'    '}
            <ToggleButton key={1} value={false}>
              <IconNoFavorite color='primary' />
            </ToggleButton>
            <ToggleButton key={2} value={true}>
              <IconFavorite color='primary' />
            </ToggleButton>
            {'    '}
            
              <ToggleButton key={4} value={false} border={1} onClick={() => showSearch()}>
                <IconSearch color='primary' />
              </ToggleButton>

          </ToggleButtonGroup>
        </Grid>
      </Grid>
      <ComicsFilter open={openSearch} setOpen={setOpenSearch} />
    </>
  );
};

function mapState({ comic }) {
  return {
    showFavorites: comic.showFavorites,
  };
}

export default connect(mapState, {
  setShowFavoritesAction,
})(ComicsMenu);
