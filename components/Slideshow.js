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
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      paddingBottom: '2rem',
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
    id: 0,
    name: 'Our Tee Shirts!',
    button: 'Shop Now!',
    color: '#45b3cb',
    img: '/gallery-0.png',
    width: 250,
    href: '/product',
  },
  {
    id: 101,
    name: 'Our Caps!',
    button: 'Shop Now!',
    color: '#6ad45e',
    img: '/owcaps.png',
    width: 450,
    href: '/caps',
  },
  {
    id: 1,
    name: 'Youth Sizes!',
    button: 'Shop Now!',
    color: '#FAB5B5',
    img: '/tshirt-slide-1.png',
    width: 200,
    href: '/product',
  },
  {
    id: 2,
    name: 'Tons of Colors!',
    button: 'Shop Now!',
    color: '#ffe500b3',
    img: '/gallery-1.png',
    width: 300,
    href: '/product',
  },
  {
    id: 3,
    name: `We're all smiling!`,
    button: 'View Gallery!',
    color: '#12c6b3',
    img: '/gallery-2.png',
    width: 250,
    href: '/gallery',
  },
  {
    id: 3,
    name: `Our shirts in action!`,
    button: 'View Gallery!',
    color: '#6ad45e',
    img: '/gallery-3.png',
    width: 350,
    href: '/gallery',
  },
  {
    id: 4,
    name: '1 World Family!',
    button: 'View Gallery!',
    color: '#45b3cb',
    img: '/gallery-5.png',
    width: 300,
    href: '/gallery',
  },
  {
    id: 5,
    name: 'Shirts for everyone!',
    button: 'Shop Now!',
    color: '#FAB5B5',
    img: '/gallery-6.png',
    width: 300,
    href: '/product',
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
          height={350}
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
