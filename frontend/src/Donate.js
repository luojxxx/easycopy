import React, { useState } from "react";
import axios from "axios";
import { Box, Flex, Text } from "rebass";
import { Label } from "@rebass/forms";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import Template from "./components/Template";
import Input from "./components/Input";
import Button from "./components/Button";
import StarIcon from "./components/StarIcon";
import Loader from "./components/Loader";
import CardSection from "./CardSection";
import { sleep } from "./lib";
import constants from "./constants";
const { api, contentLimit } = constants;

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async event => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmCardPayment(
      "client_secret",
      {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: "Jenny Rosen"
          }
        }
      }
    );

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === "succeeded") {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardSection />
      <button disabled={!stripe}>Confirm order</button>
    </form>
  );
}

const Donate = () => {
  const [amount, setAmount] = useState(1.0);
  const [submissionProcessing, setSubmissionProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const handleAmountChange = e => {
    // Should add validation to cut off decimal points
    setAmount(e.target.value);
  };
  const handleSubmit = async () => {
    try {
      setSubmissionProcessing(true);
      const response = await axios({
        method: "post",
        url: api + "/payment",
        data: {
          amount: amount * 100
        }
      });
      sleep(300);
      setSubmissionProcessing(false);
      console.log(response.data);
      setClientSecret(response.data.client_secret);
    } catch (err) {
      console.error("CreateUrl error");
      console.error(err);
    }
  };
  return (
    <Template subheading="Donate">
      <Flex
        width={1}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box width={0.5} pb={3}>
          <Label htmlFor="user">Amount ($USD)</Label>
          <Input type="number" value={amount} onChange={handleAmountChange} />
        </Box>
        {!submissionProcessing && (
          <Button variant="primary" width={0.5} mb={1} onClick={handleSubmit}>
            <Flex
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
            >
              <Text pr={2}>Submit</Text>
              <StarIcon />
            </Flex>
          </Button>
        )}
        {submissionProcessing && (
          <Flex
            width={1}
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            style={{ height: "40px" }}
          >
            <Loader />
          </Flex>
        )}
      </Flex>
    </Template>
  );
};

export default Donate;
