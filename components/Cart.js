import React from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import { useCart, formatMoney } from '../lib';

const useStyles = makeStyles({
  drawer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  closeIcon: {
    position: 'absolute',
    right: '0%',
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
  itemNode: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

export default function Cart() {
  const classes = useStyles();
  const router = useRouter();
  const { cartOpen, cartItems, closeCart, removeCartItem } = useCart();
  const total = cartItems?.reduce((acc, cur) => {
    acc = cur?.quantity * cur?.price + acc;
    return acc;
  }, 0);
  const Primary = ({ name, color, size }) => {
    return (
      <div>
        <Typography component="p" variant="h6">
          {name}
        </Typography>
        <Typography>{`${color} - ${size.toUpperCase()}`}</Typography>
      </div>
    );
  };

  const Secondary = ({ quantity, price }) => {
    return (
      <>
        <Typography component="h6">{`${quantity} x ${formatMoney(
          price
        )} each`}</Typography>
        <Typography
          component="h6"
          variant="h6"
          color="primary"
        >{`Item Total: ${formatMoney(
          parseFloat(quantity * price)
        )}`}</Typography>
      </>
    );
  };

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
                primary={
                  <Primary name={c.name} color={c.color} size={c.size} />
                }
                secondary={<Secondary quantity={c.quantity} price={c.price} />}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => removeCartItem(c.id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))
        ) : (
          <ListItem className={classes.drawer}>
            <ListItemText primary="No items are currently in your cart." />
            <Button
              onClick={() => {
                router.push('/product');
                closeCart();
              }}
              variant="outlined"
              color="primary"
            >
              Shop Now
            </Button>
          </ListItem>
        )}
      </List>
      <Divider className={classes.divider} />
      <Typography
        style={{ padding: '1rem 0rem' }}
        component="h5"
        variant="h5"
        color="primary"
      >
        {`Total: ${formatMoney(total)}`}
      </Typography>
      <Divider className={classes.divider} />
      <Button
        onClick={() => {
          router.push('/checkout');
          closeCart();
        }}
        className={classes.button}
        variant="contained"
        color="primary"
      >
        Checkout
      </Button>
      {cartItems?.length > 0 ? (
        <Button
          onClick={() => {
            router.push('/product');
            closeCart();
          }}
          variant="outlined"
          color="primary"
        >
          Continue Shopping
        </Button>
      ) : null}
    </Drawer>
  );
}
