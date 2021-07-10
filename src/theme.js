import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { red, yellow, green } from '@material-ui/core/colors';

let theme = createTheme({
  palette: {
    primary: {
      main: '#000080',
    },
    secondary: {
      main: '#f3a6c1',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    fontFamily: ['Ubuntu Condensed', 'san-serif'].join(','),
  },
});
theme = responsiveFontSizes(theme);

export default theme;
