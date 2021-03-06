import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, HashRouter, Switch, Route } from 'react-router-dom';
import reduxThunk from 'redux-thunk';
// import 'semantic-ui-css/semantic.min.css'; //  this gives me @ error...I don't know why
// import 'semantic-ui-css/semantic.min.css';

import Landing from './components/landing';
import SelectSpace from './components/select_space';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Signout from './components/auth/signout';
import Pricing from './components/pricing';
import Features from './components/features';
import LoginFormExample from './examples/loginformexample';
import SidebarLeft from './examples/sidebar';
import AddSpace from './components/add_space';
import Dashboard from './components/dashboard';

import RequireAuth from './components/auth/require_auth';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
  applyMiddleware(reduxThunk)
));
console.log('getstate', store.getState());

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
          <Switch>
            <Route path="/selectspace" component={RequireAuth(SelectSpace)} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route path="/signout" component={Signout} />
            <Route path="/pricing" component={Pricing} />
            <Route path="/features" component={Features} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/loginexample" component={LoginFormExample} />
            <Route path="/sidebar" component={SidebarLeft} />
            <Route path="/addspace" component={AddSpace} />
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
