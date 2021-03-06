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

const ComicsDetail = ({ open = false, setOpen, comic, characters, stories, fetching }) => {
  const classes = useStyles();
  const loading = <Skeleton animation='wave' width={100} className={classes.loading} />;
  const [scroll, setScroll] = React.useState('paper');
  let src = `${comic.thumbnail.path}/portrait_fantastic.${comic.thumbnail.extension}`;

  return (
      <Dialog
        open={open}
        onClose={() => setOpen(!open)}
        scroll={scroll}
        aria-labelledby='comics-title'
        aria-describedby='comics-description'
      >
        <DialogTitle id='comics-dialog-title'>COMIC'S DETAILS</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
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
                        icon={
                          <Avatar alt={char.name} src={`${char.thumbnail.path}/standard_small.${char.thumbnail.extension}`} />
                        }
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

function mapState({ comic }) {
  return {
    fetching: comic.fetching,
    characters: comic.characters,
    stories: comic.stories,
  };
}

export default connect(mapState, {})(ComicsDetail);
