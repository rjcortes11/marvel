import React, { lazy } from 'react';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import IconNoFavorite from '@material-ui/icons/FavoriteBorder';
import IconFavorite from '@material-ui/icons/Favorite';
import InfoIcon from '@material-ui/icons/InfoOutlined';

import { connect } from 'react-redux';
import { addStoriesFavoritesAction, getStories4ComiCharAction } from '../../redux/storyDuck';

const StoriesModal = lazy(() => import('./StoriesModal'));

const useStyles = makeStyles((theme) => ({
  paper: {
    height: 430,
    width: 200,
  },
}));

const StoriesSummary = ({
  stories,
  index,
  addStoriesFavoritesAction,
  favoritesList,
  showFavorites,
  getStories4ComiCharAction,
}) => {
  let listShow = [];
  if (showFavorites) {
    listShow = favoritesList;
  } else {
    listShow = stories;
  }
  let story = listShow[index];

  const classes = useStyles();
  let { title, isFavorite } = story;
  let src = `portrait_fantastic.jpg`;
  const [open, setOpen] = React.useState(false);

  let addFavorite = (char, index) => {
    addStoriesFavoritesAction(char, index);
  };

  let mostrarModal = () => {
    getStories4ComiCharAction('characters', story.id);
    getStories4ComiCharAction('comics', story.id);
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
        <Tooltip title="Click here!!! to Story's details" placement='top'>
          <img style={{ width: 168, height: 252 }} alt={title} src={src} onClick={() => mostrarModal()} />
        </Tooltip>
        <IconButton aria-label={`info about ${title}`} onClick={() => addFavorite(story, index)}>
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
        {title}
      </Box>
      <StoriesModal open={open} setOpen={setOpen} story={story} />
    </>
  );
};

function mapState({ story }) {
  return {
    stories: story.array,
    favoritesList: story.favorites,
    showFavorites: story.showFavorites,
  };
}

export default connect(mapState, {
  addStoriesFavoritesAction,
  getStories4ComiCharAction,
})(StoriesSummary);
