import React from 'react';
import Image from 'next/image';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  message: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: '2rem',
    padding: '5rem',
    justifyItems: 'center',
  },
});

export default function Message() {
  const classes = useStyles();
  return (
    <div className={classes.message}>
      <Typography variant="h3" color="primary" align="center">
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
      </Typography>
      <Image
        src="/logo-yellow-text.png"
        width={300}
        height={325}
        layout="intrinsic"
        alt="one world smiling logo"
      />
    </div>
  );
}
