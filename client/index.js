import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import reduxThunk from 'redux-thunk';
// import 'semantic-ui-css/semantic.css'; //  this gives me @ error...I don't know why

import Landing from './components/landing';
import Dashboard from './components/dashboard';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Pricing from './components/pricing';
import Features from './components/features';

import RequireAuth from './components/auth/require_auth';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');

if (token) {
  store.dispatch({ type: AUTH_USER });
}

const Root = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/dashboard" component={RequireAuth(Dashboard)} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route path="/pricing" component={Pricing} />
            <Route path="/features" component={Features} />
            <Route path="/dashboard" component={Dashboard} />
            <Route exact path="/" component={Landing} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
