import React from 'react';
import Image from 'next/image';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  message: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '2rem',
    padding: '5rem',
    justifyItems: 'center',
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '1fr',
    },
  },
  type: {
    marginBottom: '1rem',
  },
  image: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default function Message() {
  const classes = useStyles();
  return (
    <div className={classes.message}>
      <div className={classes.image}>
        <Typography
          className={classes.type}
          color="primary"
          variant="h3"
        >{`Jaylen's Message`}</Typography>
        <Image
          src="/jaylens-message.png"
          width={400}
          height={450}
          alt="hands holding a hand written note"
        />
      </div>
      {/* <Typography variant="h3" color="primary" align="center">
        My Message
      </Typography>
      <Typography variant="h6" align="center">
        The meaning of this product is to spread the smiles. So many people are
        going through situations that may take away their smiles, for example
        Covid. So please wear this and spread the smile...we need more smiles in
        the world.
      </Typography>
      <Typography variant="h6" color="primary" align="center">
        CEO - Jaylen - 9 yrs. old
      </Typography>
      <Typography variant="h4" color="secondary" align="center">
        1 World Smiling
      </Typography> */}
      <Image
        src="/smile-world-text.png"
        width={300}
        height={350}
        alt="one world smiling logo"
      />
    </div>
  );
}
