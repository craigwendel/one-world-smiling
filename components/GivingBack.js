import React from 'react';
import Image from 'next/image';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  type: {
    margin: '1rem',
  },
});

export default function GivingBack({ page, variant }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {page ? (
        <Typography className={classes.type} variant="h3" color="primary">
          Giving Back
        </Typography>
      ) : null}
      <Typography variant={variant} className={classes.type}>
        We plan to spread more smiles by donating a portion of our proceeds to
        local food banks for every shirt sold.
      </Typography>
      {page ? (
        <Image
          src="/smile-world-text.png"
          width={300}
          height={350}
          alt="one world smiling logo"
        />
      ) : null}
    </div>
  );
}
