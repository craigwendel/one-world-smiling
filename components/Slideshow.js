import React from 'react';
import Carousel from 'react-material-ui-carousel';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Paper, Button, Typography } from '@material-ui/core';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ChevronLeft from '@material-ui/icons/ChevronLeft';

const useStyles = makeStyles({
  slide: {
    height: '30vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 250,
  },
});

const slides = [
  {
    id: 1,
    name: 'Slide #1',
    description: 'Some really good content about the first slide!!!',
  },
  {
    id: 2,
    name: 'Slide #2',
    description: 'More great content...I just need to add it all in!',
  },
];

function Slide({ name, description }) {
  const classes = useStyles();
  return (
    <Paper className={classes.slide}>
      <Typography align="center" variant="h2">
        {name}
      </Typography>
      <Typography color="secondary" align="center">
        {description}
      </Typography>
      <Button className={classes.button} color="primary" variant="contained">
        Check it out!
      </Button>
    </Paper>
  );
}

export default function Slideshow() {
  return (
    <Carousel
      indicators={false}
      animation="slide"
      interval={8000}
      PrevIcon={<ChevronLeft />}
      NextIcon={<ChevronRight />}
      navButtonsProps={{
        style: {
          backgroundColor: 'transparent',
          color: '#000',
        },
      }}
    >
      {slides.map((slide) => (
        <Slide
          key={slide.id}
          name={slide.name}
          description={slide.description}
        />
      ))}
    </Carousel>
  );
}
