import React, { useState } from 'react';
import Image from 'next/image';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/CheckCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { useCart } from '../lib';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: '500px 1fr',
    alignItems: 'center',
    gridGap: '1rem',
    margin: '3rem 0rem 5rem 0rem',
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
  color: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    margin: theme.spacing(1),
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

export default function ProductPage({ name, img, basePrice }) {
  const { cartItems, addCartItem, openCart } = useCart();
  const [item, setItem] = useState({
    size: '',
    color: '',
    quantity: 0,
  });
  const [price, setPrice] = useState(basePrice);
  const updatePrice = (size) => {
    if (size.includes('youth')) {
      setPrice(14.95);
    } else if (size === 'xxl' || size === 'xxxl') {
      setPrice(20.95);
    } else {
      setPrice(18.95);
    }
  };

  const SizeSwatch = ({ value, label, handleChange }) => {
    return (
      <div
        className={`${classes.swatch} ${
          item.size === value ? classes.sizeSelected : ''
        }`}
        onClick={() => {
          handleChange('size', value);
          updatePrice(value);
        }}
      >
        {label}
      </div>
    );
  };

  const colors = [
    'yellow',
    'red',
    'orange',
    'green',
    'blue',
    'indigo',
    'violet',
  ];
  const sizeOptions = [
    { value: 'sm', label: 'S' },
    { value: 'md', label: 'M' },
    { value: 'lg', label: 'L' },
    { value: 'xl', label: 'XL' },
    { value: 'xxl', label: 'XXL' },
    { value: 'xxxl', label: 'XXXL' },
  ];
  const youthOptions = sizeOptions
    .filter((f) => !f.value.includes('xxl'))
    .map((s) => ({
      ...s,
      value: `youth ${s.value}`,
    }));

  const handleChange = (key, value) => {
    setItem({ ...item, [key]: key === 'quantity' ? parseFloat(value) : value });
  };

  const handleAddItem = () => {
    const newItem = { ...item, id: cartItems?.length + 1, name, img, price };
    addCartItem(newItem);
    setItem({ size: '', color: '', quantity: 0 });
    setPrice(basePrice);
    openCart();
  };

  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.image}>
        <Image
          src={img}
          width={400}
          height={400}
          layout="intrinsic"
          alt={name}
        />
      </div>
      <div className={classes.details}>
        <Typography color="primary" variant="h3">
          {name}
        </Typography>
        <Typography variant="h4">{`$${price}`}</Typography>
        <div className={classes.flexRow}>
          <Typography>Color</Typography>
          {colors.map((c) => (
            <Badge
              key={c}
              classes={{ anchorOriginTopRightCircular: classes.badge }}
              invisible={item.color !== c}
              overlap="circular"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              badgeContent={<CheckIcon fontSize="small" color="primary" />}
            >
              <Avatar
                className={`${classes.color} ${
                  item.color === c ? classes.colorSelected : ''
                }`}
                style={{ background: c }}
                onClick={() => handleChange('color', c)}
              >
                {' '}
              </Avatar>
            </Badge>
          ))}
        </div>
        <div className={classes.flexRow}>
          <Typography>Youth</Typography>
          {youthOptions.map((s) => (
            <SizeSwatch
              key={s.value}
              value={s.value}
              label={s.label}
              handleChange={handleChange}
            />
          ))}
        </div>
        <div className={classes.flexRow}>
          <Typography>Adult</Typography>
          {sizeOptions.map((s) => (
            <SizeSwatch
              key={s.value}
              value={s.value}
              label={s.label}
              handleChange={handleChange}
            />
          ))}
        </div>
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
      </div>
    </div>
  );
}
