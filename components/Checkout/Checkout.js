import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import SnackbarAlert from '../SnackbarAlert';
import { useCart } from '../../lib';

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
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    color: '#ffffff !important',
  },
}));

export default function Checkout() {
  const classes = useStyles();
  const router = useRouter();
  const { cartItems, emptyCart } = useCart();
  const total = cartItems.reduce((acc, cur) => {
    acc = cur.quantity * cur.price + acc;
    return acc;
  }, 0);

  const [activeStep, setActiveStep] = useState(0);
  const [details, setDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });
  const [confirm, setConfirm] = useState(false);
  const [orderNumber, setOrderNumber] = useState(0);
  useEffect(() => {
    setOrderNumber(Math.floor(100000 + Math.random() * 900000));
    return () => {
      setOrderNumber(0);
    };
  }, []);

  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null },
  });

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const steps = ['Shipping address', 'Payment details', 'Review your order'];

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm details={details} setDetails={setDetails} />;
      case 1:
        return <PaymentForm confirm={confirm} setConfirm={setConfirm} />;
      case 2:
        return <Review cartItems={cartItems} total={total} details={details} />;
      default:
        throw new Error('Unknown step');
    }
  }

  const canSubmit = (activeStep, details, confirm, total) => {
    if (activeStep === 0) {
      return details.email && details.phone && details.address1 && details.zip
        ? false
        : true;
    } else if (activeStep === 1) {
      return confirm ? false : true;
    } else if (activeStep === 2) {
      return total > 0 ? false : true;
    } else {
      return true;
    }
  };

  const disabled = canSubmit(activeStep, details, confirm, total);

  const handleResponse = (status) => {
    if (status === 200) {
      emptyCart();
      setStatus({
        submitted: true,
        submitting: false,
        info: {
          error: false,
          msg: `Thanks for your submission! We'll be in touch soon!`,
        },
      });
      handleNext();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus((prevStatus) => ({ ...prevStatus, submitting: true }));
    fetch('/api/order', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ details, orderNumber, total, cartItems }),
    }).then((res) => {
      handleResponse(res.status);
    });
    fetch('/api/new-order', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ details, orderNumber, total, cartItems }),
    });
  };

  return (
    <main className={classes.layout}>
      <SnackbarAlert
        open={status.submitted}
        severity={status.info.error ? 'error' : 'success'}
        message={status.info.msg}
        onClose={() =>
          setStatus((prevStatus) => ({ ...prevStatus, submitted: false }))
        }
      />
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <React.Fragment>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order!
              </Typography>
              <Typography variant="subtitle1">
                {`
                Your order number is #${orderNumber}. We have emailed your order
                confirmation, and will reach out to you directly at the contact
                information provided to collect payment. Thanks again and feel
                free to reach us at `}
                <Link href="mailto:1worldsmiling@gmail.com">
                  1worldsmiling@gmail.com
                </Link>
                {` with any questions!`}
              </Typography>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={() => router.push('/')}
              >
                Return Home
              </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <div className={classes.buttons}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} className={classes.button}>
                    Back
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => {
                    if (activeStep === steps.length - 1) {
                      handleSubmit(e);
                    } else {
                      handleNext();
                    }
                  }}
                  className={classes.button}
                  disabled={disabled || status.submitting}
                >
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button>
              </div>
            </React.Fragment>
          )}
        </React.Fragment>
      </Paper>
    </main>
  );
}
