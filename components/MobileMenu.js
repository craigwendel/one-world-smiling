import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import makeStyles from '@material-ui/core/styles/makeStyles';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import SocialLinks from './SocialLinks';
import { links } from '../data/links';

const useStyles = makeStyles((theme) => ({
  menu: {
    display: 'block',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  icon: {
    color: '#fff',
  },
  mobileMenu: {
    width: 200,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    padding: '1rem',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  listText: {
    textAlign: 'center',
  },
}));

export default function MobileMenu() {
  const classes = useStyles();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <div className={classes.menu}>
      <IconButton color="primary" onClick={() => setOpen(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer keepMounted open={open} onClose={() => setOpen(false)}>
        <List className={classes.mobileMenu}>
          <div
            className={classes.logo}
            onClick={() => {
              setOpen(false);
              router.push('/');
            }}
          >
            <Image
              src="/smile-world-color.png"
              height={80}
              width={80}
              layout="fixed"
              alt="one world smiling logo"
            />
          </div>
          <div className={classes.links}>
            {links.map((link) => (
              <ListItem
                key={link.name}
                button
                onClick={() => {
                  setOpen(false);
                  router.push(link.path);
                }}
              >
                <ListItemText
                  classes={{ primary: classes.listText }}
                  primary={link.name}
                />
              </ListItem>
            ))}
          </div>
          <SocialLinks email />
        </List>
      </Drawer>
    </div>
  );
}
