import 'react-toastify/dist/ReactToastify.css';

import { CssBaseline, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import createStore from './store';
import Header from './components/Header';
import NowWhat from './components/NowWhat';
import Wrapper from './components/Wrapper';

const store = createStore();
const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    },
    background: {
      default: 'rgb(226,231,238)',
    },
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <Wrapper>
        <Header />
        <NowWhat />
        <ToastContainer />
      </Wrapper>
    </Provider>
  </MuiThemeProvider>
);

export default App;
