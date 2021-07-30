import React, { useState } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import OrderSummary from './OrderSummary';
import SnackbarAlert from './SnackbarAlert';
import { useCart } from '../lib';

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
  title: {
    marginTop: theme.spacing(2),
  },
  orderSuccess: {
    marginTop: '2rem',
  },
}));

export default function Review() {
  const classes = useStyles();

  const { cartItems, emptyCart } = useCart();
  const total = cartItems.reduce((acc, cur) => {
    acc = cur.quantity * cur.price + acc;
    return acc;
  }, 0);
  const tax = cartItems.reduce((acc, cur) => {
    acc = parseFloat(cur.price * 0.0825).toFixed(2) * cur.quantity + acc;
    return acc;
  }, 0);
  const shipping = 5.95;
  const [succeeded, setSucceeded] = useState(false);
  const [paypalErrorMessage, setPaypalErrorMessage] = useState('');
  const [orderID, setOrderID] = useState(false);

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: `${(total + tax + shipping).toFixed(2)}`,
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: total?.toFixed(2),
                },
                shipping: {
                  currency_code: 'USD',
                  value: `${shipping}`,
                },
                tax_total: {
                  currency_code: 'USD',
                  value: tax?.toFixed(2),
                },
              },
            },
            items: cartItems.map((item) => ({
              name: `${item?.name} (${
                item?.color
              } - ${item?.size?.toUpperCase()})`,
              unit_amount: {
                currency_code: 'USD',
                value: item?.price,
              },
              tax: {
                currency_code: 'USD',
                value: (item.price * 0.0825).toFixed(2),
              },
              quantity: item?.quantity?.toString(),
              description: `${item?.color} - ${item?.size?.toUpperCase()}`,
            })),
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
      <SnackbarAlert
        open={Boolean(paypalErrorMessage)}
        severity="error"
        message={paypalErrorMessage}
        onClose={() => setPaypalErrorMessage('')}
      />
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>
        {succeeded ? (
          <div className={classes.orderSuccess}>
            <Typography variant="h5" gutterBottom>
              Thank you for your order!
            </Typography>
            <Typography variant="subtitle1">
              {`
          Your order number is #${orderID}. You will recieve a
          confirmation in your email.
          Due to the overwhelming popularity of our shirts, we are experiencing a 2-3 week delay in production. Rest assured, your SMILE will be on its' way as soon as possible!

          Thanks again and feel free to reach us at `}
              <Link href="mailto:1worldsmiling@gmail.com">
                1worldsmiling@gmail.com
              </Link>
              {` with any questions!`}
            </Typography>
          </div>
        ) : (
          <>
            <Typography variant="h6" gutterBottom>
              Order summary
            </Typography>
            <OrderSummary
              cartItems={cartItems}
              total={total}
              tax={tax}
              shipping={shipping}
            />
          </>
        )}
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
        </Grid>
      </Paper>
    </main>
  );
}
