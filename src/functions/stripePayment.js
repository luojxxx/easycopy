import stripeLib from "stripe";

const stripe = stripeLib(process.env.STRIPE_KEY);

export const stripePayment = async amount => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.floor(amount),
    currency: "usd",
    statement_descriptor: "Donation to EasyCopy",
    payment_method_types: ["card"],
    // Verify your integration in this guide by including this parameter
    metadata: { integration_check: "accept_a_payment" },
  });

  return {
    status: 200,
    body: {
      clientSecret: paymentIntent.client_secret
    }
  };
};
