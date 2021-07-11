import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useCart } from '../lib/cartState';

const useStyles = makeStyles({
  drawer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  closeIcon: {
    position: 'absolute',
    right: '2%',
  },
  type: {
    padding: '2rem 0rem',
  },
  divider: {
    width: '90%',
  },
  list: {
    width: 300,
  },
  fullList: {
    width: 'auto',
  },
  button: {
    width: 150,
    margin: '2rem',
  },
});

export default function Cart() {
  const classes = useStyles();
  const { cartOpen, cartItems, closeCart } = useCart();

  return (
    <Drawer
      classes={{ paper: classes.drawer }}
      open={cartOpen}
      onClose={closeCart}
      anchor="right"
    >
      <IconButton onClick={closeCart} className={classes.closeIcon}>
        <CloseIcon color="error" />
      </IconButton>
      <Typography className={classes.type} variant="h4">
        My Cart
      </Typography>
      <Divider className={classes.divider} />
      <List className={classes.list}>
        {cartItems?.length > 0 ? (
          cartItems.map((c) => (
            <ListItem key={c.id}>
              <ListItemText
                primary={`${c.quantity} - ${c.size} ${c.color} ${c.name}`}
                secondary={`$${parseFloat(c.quantity * c.price)}`}
              />
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText primary="No items are currently in your cart." />
          </ListItem>
        )}
      </List>
      <Divider className={classes.divider} />
      <Button className={classes.button} variant="contained" color="primary">
        Checkout
      </Button>
    </Drawer>
  );
}
