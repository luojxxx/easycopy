import React, { Fragment, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Box, Flex, Text, Heading } from "rebass";
import { Label } from "@rebass/forms";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import Template from "./components/Template";
import Input from "./components/Input";
import Button from "./components/Button";
import StarIcon from "./components/StarIcon";
import Loader from "./components/Loader";
import { sleep } from "./lib";
import constants from "./constants";
const { api, contentLimit } = constants;

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4"
      }
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a"
    }
  }
};

const CheckoutContainer = styled(Flex)`
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .StripeElement {
    height: 40px;
    padding: 10px 12px;
    width: 100%;
    color: #32325d;
    background-color: white;
    border: 1px solid transparent;
    border-radius: 4px;

    box-shadow: 0 1px 3px 0 #e6ebf1;
    -webkit-transition: box-shadow 150ms ease;
    transition: box-shadow 150ms ease;
  }

  .StripeElement--focus {
    box-shadow: 0 1px 3px 0 #cfd7df;
  }

  .StripeElement--invalid {
    border-color: #fa755a;
  }

  .StripeElement--webkit-autofill {
    background-color: #fefde5 !important;
  }
`;

const CheckoutForm = ({ clientSecret }) => {
  const [confirmationProcessing, setConfirmationProcessing] = useState(false);
  const [confirmationStatus, setConfirmationStatus] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async event => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    setConfirmationProcessing(true);

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          // name: "Jenny Rosen"
        }
      }
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
      setConfirmationStatus("error");
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === "succeeded") {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
        setConfirmationStatus("success");
      }
    }
    setConfirmationProcessing(false);
  };

  return (
    <CheckoutContainer>
      {confirmationStatus === null && (
        <Fragment>
          <Label>Card details</Label>
          <Box width={1} mb={3}>
            <CardElement options={CARD_ELEMENT_OPTIONS} />
          </Box>
          {!confirmationProcessing && (
            <Button onClick={handleSubmit} disabled={!stripe} mb={1}>
              Confirm donation
            </Button>
          )}
          {confirmationProcessing && (
            <Flex
              justifyContent="center"
              alignItems="center"
              style={{ height: "40px" }}
            >
              <Loader />
            </Flex>
          )}
        </Fragment>
      )}
      {confirmationStatus === "error" && (
        <Heading color="primary">
          Sorry there was an error, but Thank you for trying! We'll work on
          fixing this bug
        </Heading>
      )}
      {confirmationStatus === "success" && (
        <Heading color="primary">Thank you so much!</Heading>
      )}
    </CheckoutContainer>
  );
};

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
        {!clientSecret && (
          <Fragment>
            <Box width={0.5} pb={3}>
              <Label htmlFor="user">Amount ($USD)</Label>
              <Input
                type="number"
                value={amount}
                onChange={handleAmountChange}
              />
            </Box>
            {!submissionProcessing && (
              <Button
                variant="primary"
                width={0.5}
                mb={1}
                onClick={handleSubmit}
              >
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
          </Fragment>
        )}
        {clientSecret && <CheckoutForm clientSecret={clientSecret} />}
      </Flex>
    </Template>
  );
};

export default Donate;
