import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';

const client = new ApolloClient({
 // uri: `${process.env.REACT_APP_FAUNADB_URL}`,
  headers: {
    authorization: `Bearer ${"fnADpgj81VACAlALSYYJp7-iwFzCYXkFSY20L2xL"}`,
  //},
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
