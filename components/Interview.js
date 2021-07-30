import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  type: {
    margin: '1rem',
  },
  video: {
    width: '90%',
  },
}));

export default function Interview() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography className={classes.type} variant="h3" color="primary">
        TV Interview
      </Typography>
      <video
        className={classes.video}
        controls
        src="/sa-news-interview.mp4"
        alt="tv interview with jaylen on sa news 4"
      />
    </div>
  );
}
