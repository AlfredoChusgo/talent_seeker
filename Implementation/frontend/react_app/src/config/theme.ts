import { createTheme } from '@mui/material/styles';
import {appConfig} from "./config_helper.ts";

// Light Theme
let lightTheme = createTheme({
    palette: {
        mode: 'light',
      },
  // ... Any other customizations for the light theme
});

// Dark Theme
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
      },
  // ... Any other customizations for the dark theme
});

//const theme = appConfig.isProduction ? darkTheme : lightTheme;
const theme = appConfig.isProduction ? darkTheme : lightTheme;
export default theme;
