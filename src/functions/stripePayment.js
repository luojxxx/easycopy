import stripeLib from "stripe";

const stripe = stripeLib(process.env.STRIPE_KEY);

export const stripePayment = async amount => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    // Verify your integration in this guide by including this parameter
    metadata: { integration_check: "accept_a_payment" }
  });

  return {
    status: 200,
    body: paymentIntent
  };
};
