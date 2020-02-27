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

const SeriesModal = ({ open = false, setOpen, story, characters, comics, fetching }) => {
  const classes = useStyles();
  const loading = <Skeleton animation='wave' width={100} className={classes.loading} />;
  const [scroll, setScroll] = React.useState('paper');
  let src = `portrait_fantastic.jpg`;

  return (
      <Dialog
        open={open}
        onClose={() => setOpen(!open)}
        scroll={scroll}
        aria-labelledby='stories-title'
        aria-describedby='stories-description'
      >
        <DialogTitle id='stories-dialog-title'>STORY'S DETAILS</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
            <center>
              <img style={{ width: 168, height: 252 }} alt={story.title} src={src} />
              <h2 id='itle'>{story.title} </h2>
            </center>
            <p id='description' align='justify'>
              <b>type:</b>{story.type} <br />
              <b>Description:</b> {story.description} <br />
            </p>
            <center>
              <p>
                <b>Story's characters</b>
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
                <b>Story's comics</b>
              </p>
              <div className={classes.chips}>
                {fetching ? (
                  <Suspense fallback={loading} />
                ) : (
                  comics.map((comi) => (
                    <Suspense fallback={loading} key={comi.id}>
                      <Chip key={comi.id} icon={<Avatar alt={comi.title} src='portrait_fantastic.jpg' />} label={comi.title} />
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

function mapState({ story }) {
  return {
    fetching: story.fetching,
    characters: story.characters,
    comics: story.comics,
  };
}

export default connect(mapState, {})(SeriesModal);
