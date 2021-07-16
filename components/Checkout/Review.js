import React from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { formatMoney } from '../../lib';

const useStyles = makeStyles((theme) => ({
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

export default function Review({ cartItems, total, details }) {
  const classes = useStyles();
  const router = useRouter();
  const { firstName, lastName, address1, address2, city, state, zip, country } =
    details;

  return (
    <React.Fragment>
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
                  } \u00A0|\u00A0 ${item.size.toUpperCase()} - ${item.color}`}
                  secondary={`${item.quantity} x ${item.price}`}
                />
                <Typography variant="body2">
                  {formatMoney(item.quantity * item.price)}
                </Typography>
              </ListItem>
            ))}
            <ListItem className={classes.listItem}>
              <ListItemText primary="Shipping" secondary="Flat Rate Cost" />
              <Typography variant="body2">$4.95</Typography>
            </ListItem>
          </>
        ) : (
          <ListItem>
            <ListItemText
              primary="No items are currently in your cart."
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
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {formatMoney(total + 4.95)}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
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
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            <Typography>
              We will reach out after the order is placed to collect payment.
            </Typography>
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
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
