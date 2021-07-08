import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { red, yellow, green } from '@material-ui/core/colors';

let theme = createTheme({
  palette: {
    primary: {
      main: yellow.A400,
    },
    secondary: {
      main: green.A400,
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
  },
});
theme = responsiveFontSizes(theme);

export default theme;
