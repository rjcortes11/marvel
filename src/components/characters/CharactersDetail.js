import React, { Suspense } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Skeleton from '@material-ui/lab/Skeleton';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

function cutText(text) {
  text = text.length > 30 ? (text = text.substring(0, 30) + ' ...') : text;
  return text;
}

const useStyles = makeStyles((theme) => ({
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

const CharactersDetail = ({ open = false, setOpen, char, comics, stories, fetching }) => {
  const classes = useStyles();
  const loading = <Skeleton animation='wave' width={100} className={classes.loading} />;
  const [scroll, setScroll] = React.useState('paper');
  let src = `${char.thumbnail.path}/portrait_fantastic.${char.thumbnail.extension}`;

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(!open)}
      scroll={scroll}
      aria-labelledby='characters-title'
      aria-describedby='characters-description'
    >
      <DialogTitle id='characters-dialog-title'>CHARACTER'S DETAILS</DialogTitle>
      <DialogContent dividers={scroll === 'paper'}>
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
                        icon={
                          <Avatar alt={comi.title} src={`${comi.thumbnail.path}/standard_small.${comi.thumbnail.extension}`} />
                        }
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
          </center>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(!open)} color='primary'>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

function mapState({ character }) {
  return {
    fetching: character.fetching,
    comics: character.comics,
    stories: character.stories,
  };
}

export default connect(mapState, {})(CharactersDetail);
