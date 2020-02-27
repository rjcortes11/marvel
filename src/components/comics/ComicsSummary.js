import React, { lazy } from 'react';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import IconNoFavorite from '@material-ui/icons/FavoriteBorder';
import IconFavorite from '@material-ui/icons/Favorite';
import InfoIcon from '@material-ui/icons/InfoOutlined';

import { connect } from 'react-redux';
import { addComicFavoritesAction, getComics4CharStorAction } from '../../redux/comicDuck';

const ComicsDetail = lazy(() => import('./ComicsDetail'));
const ComicsFilter = lazy(() => import('./ComicsFilter'));

const useStyles = makeStyles((theme) => ({
  paper: {
    height: 390,
    width: 200,
  },
}));

const ComicsSummary = ({ comics, index, addComicFavoritesAction, favoritesList, showFavorites, getComics4CharStorAction }) => {
  let listShow = [];
  if (showFavorites) {
    listShow = favoritesList;
  } else {
    listShow = comics;
  }
  let comic = listShow[index];

  const classes = useStyles();
  let { thumbnail, title, isFavorite } = comic;
  let src = `${thumbnail.path}/portrait_fantastic.${thumbnail.extension}`;
  const [open, setOpen] = React.useState(false);
  
  let addFavorite = (char, index) => {
    addComicFavoritesAction(char, index);
  };

  let showDetail = () => {
    getComics4CharStorAction('characters', comic.id);
    getComics4CharStorAction('stories', comic.id);
    setOpen(!open);
  };

  return (
    <>
      <Box
        bgcolor='white'
        color='text.primary'
        m={1}
        className={classes.paper}
        textAlign='center'
        // border={3}
        borderColor='primary.main'
        borderRadius={16}
        fontWeight='fontWeightBold'
        fontSize='h7.fontSize'
        boxShadow={3}
      >
        <Tooltip title="Click here!!! to Comic's details" placement='top'>
          <img style={{ width: 168, height: 252 }} alt={title} src={src} onClick={() => showDetail()} />
        </Tooltip>
        <IconButton aria-label={`info about ${title}`} onClick={() => addFavorite(comic, index)}>
          {isFavorite ? (
            <Tooltip title='deselect favorite' placement='top'>
              <IconFavorite color='primary' />
            </Tooltip>
          ) : (
            <Tooltip title='set favorite' placement='top'>
              <IconNoFavorite color='primary' />
            </Tooltip>
          )}
        </IconButton>
        {'   '}
        <IconButton aria-label='more info' onClick={() => showDetail()}>
          <Tooltip title="Click here!!! to Comic's details" placement='top'>
            <InfoIcon color='primary' />
          </Tooltip>
        </IconButton>
        <br />
        {title}
      </Box>
      <ComicsDetail open={open} setOpen={setOpen} comic={comic} />
    </>
  );
};

function mapState({ comic }) {
  return {
    comics: comic.array,
    favoritesList: comic.favorites,
    showFavorites: comic.showFavorites,
  };
}

export default connect(mapState, {
  addComicFavoritesAction,
  getComics4CharStorAction,
})(ComicsSummary);
