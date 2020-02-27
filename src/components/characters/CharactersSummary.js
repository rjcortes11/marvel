import React, { lazy } from 'react';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import IconNoFavorite from '@material-ui/icons/FavoriteBorder';
import IconFavorite from '@material-ui/icons/Favorite';
import InfoIcon from '@material-ui/icons/InfoOutlined';

import { connect } from 'react-redux';
import { addCharacterFavoritesAction, getCharacters4ComiStorAction } from '../../redux/characterDuck';

const CharactersDetail = lazy(() => import('./CharactersDetail'));

const useStyles = makeStyles((theme) => ({
  paper: {
    height: 380,
    width: 200,
  },
}));

const CharactersSummary = ({
  chars,
  index,
  addCharacterFavoritesAction,
  favoritesList,
  showFavorites,
  getCharacters4ComiStorAction,
}) => {
  let listShow = [];
  if (showFavorites) {
    listShow = favoritesList;
  } else {
    listShow = chars;
  }
  let character = listShow[index];

  const classes = useStyles();
  let { thumbnail, name, isFavorite } = character;
  let src = `${thumbnail.path}/portrait_fantastic.${thumbnail.extension}`;
  const [open, setOpen] = React.useState(false);

  let addFavorite = (char, index) => {
    addCharacterFavoritesAction(char, index);
  };

  let mostrarModal = () => {
    getCharacters4ComiStorAction('comics', character.id);
    getCharacters4ComiStorAction('stories', character.id);
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
        fontSize='h6.fontSize'
        boxShadow={3}
      >
        <Tooltip title="Click here!!! to Character's details" placement='top'>
          <img style={{ width: 168, height: 252 }} alt={name} src={src} onClick={() => mostrarModal()} />
        </Tooltip>
        <IconButton aria-label={`info about ${name}`} onClick={() => addFavorite(character, index)}>
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
        <IconButton aria-label='more info' onClick={() => mostrarModal()}>
          <Tooltip title="Click here!!! to Story's details" placement='top'>
            <InfoIcon color='primary' />
          </Tooltip>
        </IconButton>
        <br />
        {name}
      </Box>
      <CharactersDetail open={open} setOpen={setOpen} char={character} />
    </>
  );
};

function mapState({ character }) {
  return {
    chars: character.array,
    favoritesList: character.favorites,
    showFavorites: character.showFavorites,
  };
}

export default connect(mapState, {
  addCharacterFavoritesAction,
  getCharacters4ComiStorAction,
})(CharactersSummary);
