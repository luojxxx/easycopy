import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import * as Sentry from "@sentry/browser";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import App from "./App";
import Contact from "./Contact";
import Privacy from "./Privacy";
import TermsOfService from "./TermsOfService";
import CheckoutForm from "./CheckoutForm";

import { ThemeProvider } from "emotion-theming";
import theme from "./theme";

import * as serviceWorker from "./serviceWorker";

Sentry.init({
  dsn: "https://83b0d8e1cf934f2aa72aa89f194a5732@sentry.io/5169583"
});
const stripePromise = loadStripe("pk_test_sqH73i1MZwX6qXXBfb3OcfLP00vL4K6A37");

const Index = (
  <Elements stripe={stripePromise}>
    <Router>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/contact" component={Contact} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/termsofservice" component={TermsOfService} />
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
