import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import SnackbarAlert from './SnackbarAlert';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '3rem',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  input: {
    width: 100,
    margin: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: 200,
  },
}));

export default function ContactForm({ order }) {
  const classes = useStyles();
  const sizeOptions = [
    { value: 'sm', label: 'Small' },
    { value: 'md', label: 'Medium' },
    { value: 'lg', label: 'Large' },
    { value: 'xl', label: 'X-Large' },
    { value: 'xxl', label: 'XX-Large' },
  ];
  const [tshirts, setTshirts] = useState([{ id: 1, size: '', quantity: 0 }]);
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null },
  });
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  const handleShirtChange = (e, id) => {
    const { name, value, type } = e.target;
    const target = tshirts.findIndex((t) => t.id === id);
    tshirts[target][name] = type ? parseFloat(value) : value;
    setTshirts([...tshirts]);
  };
  const addShirt = () => {
    setTshirts([...tshirts, { id: tshirts.length + 1, size: '', quantity: 0 }]);
  };
  const deleteShirt = (id) => {
    setTshirts(tshirts.filter((t) => t.id !== id));
  };

  const handleResponse = (status, msg) => {
    if (status === 200) {
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg: msg },
      });
      setState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
      });
      setTshirts([{ id: 1, size: '', quantity: 0 }]);
    } else {
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: true, msg: msg },
      });
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setStatus((prevStatus) => ({ ...prevStatus, submitting: true }));
    const res = await fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...state, tshirts, order }),
    });
    const text = await res.text();
    handleResponse(res.status, text);
  };

  return (
    <div className={classes.root}>
      <SnackbarAlert
        open={status.submitted}
        severity={status.info.error ? 'error' : 'success'}
        message={status.info.msg}
        onClose={() =>
          setStatus((prevStatus) => ({ ...prevStatus, submitted: false }))
        }
      />
      <Typography color="primary" component="h2" variant="h3">
        {order ? 'Order Tee Shirts' : 'Contact Us'}
      </Typography>
      <form className={classes.form} noValidate onSubmit={handleOnSubmit}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              value={state.firstName}
              onChange={handleChange}
              id="firstName"
              label="First Name"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              value={state.lastName}
              onChange={handleChange}
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              value={state.email}
              onChange={handleChange}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              value={state.phone}
              onChange={handleChange}
              name="phone"
              label="Phone"
              id="phone"
              autoComplete="phone"
            />
          </Grid>
          {order ? (
            <>
              <Typography>Shirt Sizes</Typography>
              {tshirts.map((t) => (
                <Grid key={t.id} container alignItems="center">
                  <TextField
                    select
                    className={classes.input}
                    variant="outlined"
                    fullWidth
                    name="size"
                    label="Size"
                    id="size"
                    value={t.size}
                    onChange={(e) => handleShirtChange(e, t.id)}
                  >
                    {sizeOptions?.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    className={classes.input}
                    type="number"
                    variant="outlined"
                    fullWidth
                    name="quantity"
                    label="Quantity"
                    id="quantity"
                    value={t.quantity}
                    onChange={(e) => handleShirtChange(e, t.id)}
                  />

                  <IconButton
                    aria-label="delete"
                    onClick={() => deleteShirt(t.id)}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </Grid>
              ))}
              <Grid item xs={3}>
                <Fab
                  size="small"
                  color="primary"
                  aria-label="add shirt option"
                  onClick={addShirt}
                >
                  <AddIcon />
                </Fab>
              </Grid>
            </>
          ) : (
            <Grid item xs={12} sm={6}>
              <TextField
                multiline
                maxRows={3}
                variant="outlined"
                fullWidth
                placeholder="Hi! I would like to ask something..."
                value={state.message}
                onChange={handleChange}
                name="message"
                label="Your Message"
                id="message"
              />
            </Grid>
          )}
        </Grid>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.submit}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
