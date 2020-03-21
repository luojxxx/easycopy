import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import CreatePage from './CreatePage';
import * as serviceWorker from './serviceWorker';

const Index = (
  <Router>
    <Switch>
      <Route path="/" component={CreatePage} />
      {/* <Route path="/*" component={GetPage} /> */}
    </Switch>
  </Router>
);

ReactDOM.render(Index, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
