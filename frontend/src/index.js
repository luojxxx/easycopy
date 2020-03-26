import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import * as Sentry from "@sentry/browser";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import App from "./views/App";
import Contact from "./views/Contact";
import Privacy from "./views/Privacy";
import TermsOfService from "./views/TermsOfService";
import Donate from "./views/Donate";

import { ThemeProvider } from "emotion-theming";
import theme from "./theme";

import * as serviceWorker from "./serviceWorker";

Sentry.init({
  dsn: "https://83b0d8e1cf934f2aa72aa89f194a5732@sentry.io/5169583"
});
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Index = (
  <Elements stripe={stripePromise}>
    <Router>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/contact" component={Contact} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/termsofservice" component={TermsOfService} />
          <Route path="/donate" component={Donate} />
          <Route path="/" component={App} />
        </Switch>
      </ThemeProvider>
    </Router>
  </Elements>
);

ReactDOM.render(Index, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
