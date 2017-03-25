import React          from 'react';
import ReactDOM       from 'react-dom';
import api            from './api';
import App            from './components/App';
import AboutPage      from './components/AboutPage';
import SigninPage     from './components/SigninPage';
import SessionActions from './actions/SessionActions';
import {
  Router,
  Route,
  hashHistory
} from 'react-router'

window.handleGoogleApiLoaded = () => {
  SessionActions.authorize(true, renderApp);
}

renderApp();

function renderApp() {
  ReactDOM.render(
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <Route path="/about" component={AboutPage} />
        <Route path="/signin" component={SigninPage} />
      </Route>
    </Router>,
    document.getElementById('root')
  );
}
