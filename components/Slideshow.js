import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Carousel from 'react-material-ui-carousel';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Paper, Button, Typography } from '@material-ui/core';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ChevronLeft from '@material-ui/icons/ChevronLeft';

const useStyles = makeStyles((theme) => ({
  slide: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingBottom: '2rem',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  image: {
    padding: '2rem',
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    justifyItems: 'center',
    gridGap: '2rem',
  },
  button: {
    width: 180,
  },
}));

const slides = [
  {
    id: 1,
    name: 'Our Shirts',
    button: 'Order Now!',
    color: '#FAB5B5',
    img: '/t-shirt-front-back.png',
    width: 250,
    href: '/order',
  },
  {
    id: 2,
    name: '#Sm1le',
    button: 'Learn More',
    color: '#ffe500b3',
    img: '/smile-world-color.png',
    width: 300,
    href: '/my-message',
  },
];

function Slide({ name, button, color, img, width, href }) {
  const classes = useStyles();
  const router = useRouter();
  return (
    <Paper className={classes.slide} style={{ background: color }}>
      <div className={classes.image}>
        <Image
          src={img}
          width={width}
          height={300}
          layout="intrinsic"
          alt={name}
        />
      </div>
      <div className={classes.content}>
        <Typography align="center" variant="h2">
          {name}
        </Typography>
        <Button
          onClick={() => router.push(href)}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          {button}
        </Button>
      </div>
    </Paper>
  );
}

export default function Slideshow() {
  return (
    <Carousel
      indicators={false}
      navButtonsAlwaysVisible
      animation="slide"
      interval={10000}
      PrevIcon={<ChevronLeft fontSize="large" />}
      NextIcon={<ChevronRight fontSize="large" />}
      navButtonsProps={{
        style: {
          backgroundColor: 'transparent',
          color: '#fff',
        },
      }}
    >
      {slides.map((slide) => (
        <Slide
          key={slide.id}
          name={slide.name}
          button={slide.button}
          color={slide.color}
          img={slide.img}
          width={slide.width}
          href={slide.href}
        />
      ))}
    </Carousel>
  );
}
