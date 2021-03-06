import React, { Suspense } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';

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

const ComicsModal = ({ open = false, setOpen, comic, characters, stories, fetching }) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const loading = <Skeleton animation='wave' width={100} className={classes.loading} />;
  let src = `${comic.thumbnail.path}/portrait_fantastic.${comic.thumbnail.extension}`;

  return (
    <Modal aria-labelledby='modal-title' aria-describedby='modal-description' open={open} onClose={() => setOpen(!open)}>
      <div style={modalStyle} className={classes.paper}>
        <center>
          <img style={{ width: 168, height: 252 }} alt={comic.title} src={src} />
          <h2 id='itle'>{comic.title}</h2>
        </center>
        <p id='description' align='justify'>
          <b>Format:</b> {comic.format} <br />
          <b>N. pages:</b> {comic.pageCount} <br />
          <b>Description:</b> {comic.description} <br />
        </p>
        <center>
          <p>
            <b>Comic's characters</b>
          </p>
          <div className={classes.chips}>
            {fetching ? (
              <Suspense fallback={loading} />
            ) : (
              characters.map((char) => (
                <Suspense fallback={loading} key={char.id}>
                  <Chip
                    key={char.id}
                    icon={<Avatar alt={char.name} src={`${char.thumbnail.path}/standard_small.${char.thumbnail.extension}`} />}
                    label={char.name}
                  />
                </Suspense>
              ))
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

function mapState({ comic }) {
  return {
    fetching: comic.fetching,
    characters: comic.characters,
    stories: comic.stories,
  };
}

export default connect(mapState, {})(ComicsModal);
