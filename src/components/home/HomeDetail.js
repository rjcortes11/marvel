import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Pageview from '@material-ui/icons/Pageview';

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  media: {
    height: 300,
    // width: '900%',
    maxWidth: 300,
  },
  actionArea: {
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
});

const HomeDetail = ({ thumbnail, title, link }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root} raised={true}>
      <CardHeader title={title} />
      <NavLink className='link' activeClassName='active' to={link}>
        <CardActionArea>
          <img style={{ width: 168, height: 252 }} alt={title} src={thumbnail} />
        </CardActionArea>
      </NavLink>
      <br />
      <center>
          <Button variant='outlined' color='primary' component={Link} to={link} startIcon={ <Pageview /> }>
          {title}
          </Button>
      </center>
      <br />
    </Card>
  );
};

export default HomeDetail;
