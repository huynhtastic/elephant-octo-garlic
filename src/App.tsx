import 'react-toastify/dist/ReactToastify.css';

import { CssBaseline, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { createClient, defaultExchanges, subscriptionExchange, Provider as UrqlProvider } from 'urql';

import createStore from './store';
import Header from './components/Header';
import Dashboard from './pages/dashboard/Dashboard';

const url = '://react.eogresources.com/graphql';

const subscriptionClient = new SubscriptionClient(`wss${url}`, { reconnect: true });

const client = createClient({
  url: `https${url}`,
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription(op) {
        return subscriptionClient.request(op);
      },
    }),
  ],
});

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
      <UrqlProvider value={client}>
        <Header />
        <Dashboard />
        <ToastContainer />
      </UrqlProvider>
    </Provider>
  </MuiThemeProvider>
);

export default App;
