import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, HashRouter, Switch, Route } from 'react-router-dom';
import reduxThunk from 'redux-thunk';
// import 'semantic-ui-css/semantic.css'; //  this gives me @ error...I don't know why

import Landing from './components/landing';
import Dashboard from './components/dashboard';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Signout from './components/auth/signout';
import Pricing from './components/pricing';
import Features from './components/features';
import Navbar from './components/navbar';

import RequireAuth from './components/auth/require_auth';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
  applyMiddleware(reduxThunk)
));

// before applying redux-dev-tool
// const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
// const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');

if (token) {
  store.dispatch({ type: AUTH_USER });
}

const Root = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <div>
          <Navbar />
          <Switch>
            <Route path="/dashboard" component={RequireAuth(Dashboard)} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route path="/signout" component={Signout} />
            <Route path="/pricing" component={Pricing} />
            <Route path="/features" component={Features} />
            <Route path="/dashboard" component={Dashboard} />
            <Route exact path="/" component={Landing} />
          </Switch>
        </div>
      </HashRouter>
    </Provider>
  );
};

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
