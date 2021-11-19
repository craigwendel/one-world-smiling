import React from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { formatMoney } from '../lib';

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  totalCost: {
    color: theme.palette.primary.main,
  },
}));

export default function OrderSummary({ cartItems, total, tax, shipping }) {
  const classes = useStyles();
  const router = useRouter();
  return (
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
          <Divider />
          <ListItem className={classes.listItem}>
            <ListItemText
              classes={{ primary: classes.totalCost }}
              primary="Items Cost"
              secondary="Total Cost of Items"
            />
            <Typography>{formatMoney(total)}</Typography>
          </ListItem>
          <Divider />
          <ListItem className={classes.listItem}>
            <ListItemText primary="Est. Sales Tax" />
            <Typography variant="body2">{formatMoney(tax)}</Typography>
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText primary="Shipping" secondary="Flat Rate Cost" />
            <Typography variant="body2">{`$${shipping}`}</Typography>
          </ListItem>
          <Divider />
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
          <ListItemText
            classes={{ primary: classes.totalCost }}
            primary="Total Cost"
          />
          <Typography color="primary" variant="h6" className={classes.total}>
            {formatMoney(total + tax + shipping)}
          </Typography>
        </ListItem>
      ) : null}
    </List>
  );
}
