import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import Routes from './Routes';

const theme = createMuiTheme({});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <SnackbarProvider maxSnack={3}>
      <Container className='pt-3'>
        <BrowserRouter>
          <Routes/>
        </BrowserRouter>
      </Container>
    </SnackbarProvider>
  </MuiThemeProvider>
);

export default App;
