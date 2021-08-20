import React from 'react';
import Image from 'next/image';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    justifyItems: 'center',
    marginBottom: '1.5rem',
  },
  type: {
    marginBottom: '1rem',
  },
  images: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  image: {
    margin: '0.5rem',
  },
}));

export default function Message() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Typography
        className={classes.type}
        color="primary"
        variant="h3"
        component="h1"
      >
        Our Gallery!
      </Typography>
      <div className={classes.images}>
        {[0, 1, 2, 3, 4, 5].map((e) => (
          <div key={e} className={classes.image}>
            <Image
              src={`/gallery-${e}.png`}
              width={300}
              height={350}
              alt="people in 1 world smiling t-shirts"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
