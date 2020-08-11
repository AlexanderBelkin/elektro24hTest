import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import Routes from './Routes';

const theme = createMuiTheme({});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <SnackbarProvider autoHideDuration={8000} maxSnack={3}>
      <BrowserRouter>
        <Routes/>
      </BrowserRouter>
    </SnackbarProvider>
  </MuiThemeProvider>
);

export default App;
