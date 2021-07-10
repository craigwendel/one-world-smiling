import React from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import SocialLinks from './SocialLinks';
import MobileMenu from './MobileMenu';

const useStyles = makeStyles((theme) => ({
  header: {
    background: '#fff',
    height: 75,
    minHeight: 75,
    position: 'fixed',
    zIndex: 100,
    width: '100%',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  },
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 10,
  },
  links: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  },
  logoBar: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginRight: 26,
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
      margin: 0,
    },
    '&:hover': {
      cursor: 'pointer',
    },
  },
  logo: {
    width: 125,
    padding: '1%',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  link: {
    color: 'inherit',
    padding: '0.5rem',
    fontWeight: 700,
    textDecoration: 'none',
  },
}));

function ScrollTop(props) {
  const { children } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor'
    );
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

export default function AppHeader(props) {
  const classes = useStyles();
  const router = useRouter();

  return (
    <>
      <Toolbar variant="dense" classes={{ root: classes.header }}>
        <MobileMenu />
        <div className={classes.logoBar} onClick={() => router.push('/')}>
          <Typography color="primary" variant="h3">
            1 World Smiling
          </Typography>
        </div>
        <div className={classes.links}>
          <SocialLinks email />
        </div>
      </Toolbar>
      <Toolbar style={{ minHeight: 75 }} id="back-to-top-anchor" />
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
};
