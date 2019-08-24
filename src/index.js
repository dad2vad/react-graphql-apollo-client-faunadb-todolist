import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: `${process.env.DB_URI}`,
  headers: {
    authorization: `Bearer ${process.env.DB_BEARER_TOKEN}`,
  },
});

ReactDOM.render(<App />, document.getElementById('root'));
