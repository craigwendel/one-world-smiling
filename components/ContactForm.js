import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
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
  progress: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: 200,
  },
}));

export default function ContactForm() {
  const classes = useStyles();
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

  const handleResponse = (status) => {
    if (status === 200) {
      setStatus({
        submitted: true,
        submitting: false,
        info: {
          error: false,
          msg: `Thanks for your submission! We'll be in touch soon!`,
        },
      });
      setState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
      });
    } else {
      setStatus({
        submitted: true,
        submitting: false,
        info: {
          error: true,
          msg: `There was a problem with your request, please try again later`,
        },
      });
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setStatus((prevStatus) => ({ ...prevStatus, submitting: true }));
    fetch('/api/contact', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state),
    }).then((res) => {
      handleResponse(res.status);
    });
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
        Contact Us
      </Typography>
      <Typography variant="h6">
        Fill out the request below with your information and message or feel
        free to email us at{' '}
        <Link href="mailto:1worldsmiling@gmail.com">
          1worldsmiling@gmail.com
        </Link>
      </Typography>
      {status.submitting ? (
        <LinearProgress className={classes.progress} color="primary" />
      ) : null}
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
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.submit}
          disabled={status.submitting}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
