import stripeLib from "stripe";

const stripe = stripeLib(process.env.STRIPE_KEY);

export const stripePayment = async amount => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.floor(amount),
    currency: "usd",
    // Verify your integration in this guide by including this parameter
    metadata: { integration_check: "accept_a_payment" },
    statement_descriptor: "Donation to EasyCopy"
  });

  return {
    status: 200,
    body: paymentIntent
  };
};
