import React, { Suspense } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Skeleton from '@material-ui/lab/Skeleton';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  loading: { margin: theme.spacing(0.5) },
}));

const ComicsFilter = ({ open = false, setOpen }) => {
  const classes = useStyles();
  const loading = <Skeleton animation='wave' width={100} className={classes.loading} />;
  const [scroll, setScroll] = React.useState('paper');

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(!open)}
      scroll={scroll}
      aria-labelledby='filter-title'
      aria-describedby='filter-description'
    >
      <DialogTitle id='filter-dialog-title'>COMIC'S SEARCH</DialogTitle>
      <DialogContent dividers={scroll === 'paper'}>
        <DialogContentText>Please complete the following fields.</DialogContentText>
        <TextField autoFocus margin='dense' id='name' label='Email Address' type='email' fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(!open)} color='primary'>
          Search
        </Button>
      </DialogActions>
    </Dialog>
  );
};

function mapState({ comic }) {
  return {};
}

export default connect(mapState, {})(ComicsFilter);
