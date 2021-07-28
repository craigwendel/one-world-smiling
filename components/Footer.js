import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import SocialLinks from './SocialLinks';

const useStyles = makeStyles((theme) => ({
  footer: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: '1rem',
    alignItems: 'center',
    padding: '1vmax 3vw',
    width: '100%',
    backgroundColor: theme.palette.primary.main,
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '1fr',
      gridGap: '2rem',
      paddingTop: '2rem',
    },
  },
  text: {
    marginBottom: '0.5rem',
    [theme.breakpoints.down('xs')]: {
      marginBottom: '0rem',
    },
  },
  image: {
    padding: '0.5rem',
  },
  content: {
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  signup: {
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('xs')]: {
      alignItems: 'center',
    },
  },
  input: {
    width: '80%',
    '& label.Mui-focused': {
      color: '#fff',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#fff',
      },
      '&:hover fieldset': {
        borderColor: '#fff',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#fff',
      },
    },
  },
  inputColor: {
    color: '#fff',
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      {/* <div className={classes.signup}> */}
      {/* <Typography className={classes.text} variant="h6">
          Sign up to learn more!
        </Typography>
        <TextField
          label="Email"
          classes={{ root: classes.input }}
          InputLabelProps={{
            className: classes.inputColor,
          }}
          InputProps={{
            className: classes.inputColor,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  color="inherit"
                  // onClick={}
                >
                  <ArrowForwardIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          variant="outlined"
        /> */}
      {/* </div> */}
      <div className={classes.content}>
        <div className={classes.image}>
          <Typography variant="h5">1 World Smiling</Typography>
        </div>
        <SocialLinks color="#fff" email />
        <Typography>{`Copyright © ${new Date().getFullYear()}`}</Typography>
      </div>
    </div>
  );
}
