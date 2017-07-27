import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

// import 'semantic-ui-css/semantic.css'; //  this gives me @ error...I don't know why

import App from './components/App';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import Login from './components/Login';
import Pricing from './components/Pricing';
import Features from './components/Features';
// tell apollo to use id to identify every piece
// of and tell react whatever is updated
const client = new ApolloClient({
  dataIdFromObject: o => o.id
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Dashboard} />
          <Route path="signup" component={Signup} />
          <Route path="login" component={Login} />
          <Route path="features" component={Features} />
          <Route path="pricing" component={Pricing} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
