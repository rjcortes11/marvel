import React, { Suspense } from 'react';
import { connect } from 'react-redux';

// https://material-ui.com/es/components/dialogs/

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';

import Skeleton from '@material-ui/lab/Skeleton';

import ExitToApp from '@material-ui/icons/ExitToApp';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

function cutText(text) {
  text = text.length > 30 ? (text = text.substring(0, 30) + ' ...') : text;
  return text;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  chips: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  loading: { margin: theme.spacing(0.5) },
}));

const CharactersModal = ({ open = false, setOpen, char, comics, stories, fetching }) => {
  const classes = useStyles();
  const [scroll, setScroll] = React.useState('paper');
  const [modalStyle] = React.useState(getModalStyle);
  const loading = <Skeleton animation='wave' width={100} className={classes.loading} />;
  let src = `${char.thumbnail.path}/portrait_fantastic.${char.thumbnail.extension}`;

  return (
    <Modal aria-labelledby='modal-title' aria-describedby='modal-description' open={open} onClose={() => setOpen(!open)}>
      <div style={modalStyle} className={classes.paper}>
        <center>
          <img style={{ width: 168, height: 252 }} alt={char.name} src={src} />
          <h2 id='itle'>{char.name}</h2>
        </center>
        <p id='description' align='justify'>
          <b>Description:</b> {char.description} <br />
        </p>
        <center>
          <p>
            <b>Character's comics</b>
          </p>
          <div className={classes.chips}>
            {fetching ? (
              <Suspense fallback={loading} />
            ) : (
              comics.map((comi) => {
                comi.title = cutText(comi.title);
                return (
                  <Suspense fallback={loading} key={comi.id}>
                    <Chip
                      key={comi.id}
                      icon={<Avatar alt={comi.title} src={`${comi.thumbnail.path}/standard_small.${comi.thumbnail.extension}`} />}
                      label={comi.title}
                    />
                  </Suspense>
                );
              })
            )}
          </div>
          <p>
            <b>Comic's stories</b>
          </p>
          <div className={classes.chips}>
            {fetching ? (
              <Suspense fallback={loading} />
            ) : (
              stories.map((story) => (
                <Suspense fallback={loading} key={story.id}>
                  <Chip key={story.id} icon={<Avatar alt={story.title} src='portrait_fantastic.jpg' />} label={story.title} />
                </Suspense>
              ))
            )}
          </div>
          <br />
          <Tooltip title='Back to list' aria-label='Back to list'>
            <Button variant='contained' color='primary' onClick={() => setOpen(!open)}>
              <ExitToApp />
            </Button>
          </Tooltip>
          <br />
        </center>
      </div>
    </Modal>
  );
};

function mapState({ character }) {
  return {
    fetching: character.fetching,
    comics: character.comics,
    stories: character.stories,
  };
}

export default connect(mapState, {})(CharactersModal);
