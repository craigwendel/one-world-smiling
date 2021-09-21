import React from 'react';
import Image from 'next/image';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '5rem',
    [theme.breakpoints.down('xs')]: {
      padding: '3rem',
    },
  },
  message: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '2rem',
    justifyItems: 'center',
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '1fr',
    },
  },
  type: {
    marginBottom: '1rem',
  },
  textImage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default function Message() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography
        className={classes.type}
        color="primary"
        variant="h3"
        align="center"
      >{`Jaylen's Message`}</Typography>
      <div className={classes.message}>
        <Image
          src="/jaylens-message.png"
          width={400}
          height={450}
          alt="hands holding a hand written note"
        />
        <Image
          src="/jaylen.png"
          width={350}
          height={400}
          alt="jaylen school photo"
        />
      </div>
    </div>
  );
}
