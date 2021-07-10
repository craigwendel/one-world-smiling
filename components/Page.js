import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from './Header';
import Footer from './Footer';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr',
  },
});

export default function Page(props) {
  const classses = useStyles();

  return (
    <div className={classses.root}>
      <Header />
      {props.children}
      <Footer />
    </div>
  );
}
