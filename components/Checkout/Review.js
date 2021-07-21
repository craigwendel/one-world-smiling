import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { formatMoney, useCart } from '../../lib';

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review() {
  const classes = useStyles();
  const router = useRouter();
  const { cartItems, emptyCart } = useCart();
  const total = cartItems.reduce((acc, cur) => {
    acc = cur.quantity * cur.price + acc;
    return acc;
  }, 0);
  const [succeeded, setSucceeded] = useState(false);
  const [paypalErrorMessage, setPaypalErrorMessage] = useState('');
  const [orderID, setOrderID] = useState(false);
  console.log('ORDER ID', orderID, succeeded);

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: '0.01',
            },
          },
        ],
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  const onApprove = (data, actions) => {
    return actions.order
      .capture()
      .then(function () {
        emptyCart();
        setSucceeded(true);
      })
      .catch((err) =>
        setPaypalErrorMessage(`Something went wrong. ERR: ${err}`)
      );
  };

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>
        {succeeded ? (
          <>
            <Typography variant="h5" gutterBottom>
              Thank you for your order!
            </Typography>
            <Typography variant="subtitle1">
              {`
          Your order number is #${orderID}. We have emailed your order
          confirmation, and will reach out to you directly at the contact
          information provided to collect payment. Thanks again and feel
          free to reach us at `}
              <Link href="mailto:1worldsmiling@gmail.com">
                1worldsmiling@gmail.com
              </Link>
              {` with any questions!`}
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="h6" gutterBottom>
              Order summary
            </Typography>
            <List disablePadding>
              {cartItems.length > 0 ? (
                <>
                  {cartItems.map((item) => (
                    <ListItem className={classes.listItem} key={item.id}>
                      <ListItemText
                        primary={`${
                          item.name
                        } \u00A0|\u00A0 ${item.size.toUpperCase()} - ${
                          item.color
                        }`}
                        secondary={`${item.quantity} x ${item.price}`}
                      />
                      <Typography variant="body2">
                        {formatMoney(item.quantity * item.price)}
                      </Typography>
                    </ListItem>
                  ))}
                  <ListItem className={classes.listItem}>
                    <ListItemText
                      primary="Shipping"
                      secondary="Flat Rate Cost"
                    />
                    <Typography variant="body2">$4.95</Typography>
                  </ListItem>
                </>
              ) : (
                <ListItem>
                  <ListItemText
                    primary="No items are currently in your cart. Please add an item to continue with the checkout process."
                    secondary={
                      <Button
                        onClick={() => router.push('/product')}
                        variant="outlined"
                        color="primary"
                      >
                        Shop Now
                      </Button>
                    }
                  />
                </ListItem>
              )}
              {total > 0 ? (
                <ListItem className={classes.listItem}>
                  <ListItemText primary="Total" />
                  <Typography variant="subtitle1" className={classes.total}>
                    {formatMoney(total + 4.95)}
                  </Typography>
                </ListItem>
              ) : null}
            </List>
          </>
        )}
        {/* <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>{`${firstName} ${lastName}`}</Typography>
          <Typography gutterBottom>{address1}</Typography>
          {address2 ? <Typography gutterBottom>{address2}</Typography> : null}
          <Typography
            gutterBottom
          >{`${city}, ${state} \u00A0${zip}, ${country}`}</Typography>
        </Grid> */}
        <Grid item container direction="column">
          <Typography
            align="center"
            variant="h6"
            gutterBottom
            className={classes.title}
          >
            Payment
          </Typography>
          <PayPalButtons
            disabled={total <= 0}
            style={{ color: 'blue', shape: 'pill', label: 'pay', height: 40 }}
            createOrder={createOrder}
            onApprove={onApprove}
          />
          {/* <Typography>
              We will reach out after the order is placed to collect payment.
            </Typography> */}
          {/* {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))} */}
          {/* </Grid> */}
        </Grid>
      </Paper>
    </main>
  );
}
