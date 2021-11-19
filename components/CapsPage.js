import React, { useState } from 'react';
import Image from 'next/image';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CheckIcon from '@material-ui/icons/CheckCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import GivingBack from './GivingBack';
import { useCart } from '../lib';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: '500px 1fr',
    alignItems: 'center',
    gridGap: '1rem',
    margin: '2rem 1.5rem 5rem 1.5rem',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '400px 1fr',
    },
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '1fr',
      justifyItems: 'center',
    },
  },
  image: {
    padding: '2rem',
  },
  details: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: '1rem',
  },
  flexRow: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  badge: {
    top: '20%',
    right: '20%',
  },
  sizeBadge: {
    top: '10%',
    right: '10%',
  },
  color: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    margin: theme.spacing(1),
    border: '1px solid #000',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  colorSelected: {
    border: `3px solid ${theme.palette.primary.main}`,
  },
  swatch: {
    height: 35,
    width: 35,
    margin: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #000',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  sizeSelected: {
    background: theme.palette.secondary.main,
    color: '#fff',
  },
  select: {
    width: 125,
  },
  input: {
    width: 60,
  },
  button: {
    width: 250,
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
    color: '#ffffff !important',
  },
}));

export default function CapsPage({ name, img, basePrice }) {
  const { cartItems, addCartItem, openCart } = useCart();
  const [item, setItem] = useState({
    size: 'os',
    color: 'White',
    quantity: 0,
  });
  const [price, setPrice] = useState(basePrice);

  const SizeSwatch = ({ label }) => {
    return (
      <div className={`${classes.swatch} ${classes.sizeSelected}`}>{label}</div>
    );
  };

  const ColorCircle = ({ label, hex, handleChange }) => {
    return (
      <>
        <Tooltip title={label} placement="top">
          <Badge
            classes={{ anchorOriginTopRightCircular: classes.badge }}
            invisible={item.color !== label}
            overlap="circular"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            badgeContent={<CheckIcon fontSize="small" color="primary" />}
          >
            <Avatar
              className={`${classes.color} ${
                item.color === label ? classes.colorSelected : ''
              }`}
              style={{ background: hex }}
              onClick={() => handleChange('color', label)}
            >
              {' '}
            </Avatar>
          </Badge>
        </Tooltip>
      </>
    );
  };

  const colors = [
    { label: 'White', hex: '#fff' },
    { label: 'Black', hex: '#000' },
  ];
  const sizes = [{ value: 'os', label: 'OS' }];

  const handleChange = (key, value) => {
    setItem({
      ...item,
      [key]: key === 'quantity' ? parseFloat(value) : value,
    });
  };

  const handleAddItem = () => {
    const newItem = { ...item, id: cartItems?.length + 1, name, img, price };
    addCartItem(newItem);
    setItem({ ...item, size: '', quantity: 0 });
    openCart();
  };

  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.image}>
        <Image src={`${img}.png`} width={400} height={300} alt={name} />
      </div>
      <div className={classes.details}>
        <Typography color="primary" variant="h3">
          {name}
        </Typography>
        <div className={classes.flexRow}>
          <Typography>Color</Typography>
          {colors.map((c) => (
            <ColorCircle
              key={c.label}
              label={c.label}
              hex={c.hex}
              handleChange={handleChange}
            />
          ))}
        </div>
        <div className={classes.flexRow}>
          <Typography>{item.sizeType}</Typography>
          {sizes.map((s) => (
            <SizeSwatch key={s.value} label={s.label} />
          ))}
        </div>
        <Typography variant="h4">{`$${price} each`}</Typography>
        <div className={classes.flexRow}>
          <IconButton
            onClick={() =>
              handleChange(
                'quantity',
                item.quantity - 1 >= 0 ? item.quantity - 1 : 0
              )
            }
          >
            <RemoveCircleIcon />
          </IconButton>
          <TextField
            className={classes.input}
            variant="outlined"
            type="number"
            value={item.quantity}
            onChange={(e) => handleChange('quantity', e.target.value)}
            inputProps={{ min: 0 }}
          />
          <IconButton
            onClick={() => handleChange('quantity', item.quantity + 1)}
          >
            <AddCircleIcon />
          </IconButton>
        </div>
        <Button
          className={classes.button}
          disabled={item.color && item.size && item.quantity > 0 ? false : true}
          onClick={handleAddItem}
          color="primary"
          variant="contained"
        >
          Add to Cart
        </Button>
        <GivingBack variant="h6" />
      </div>
    </div>
  );
}
