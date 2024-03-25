const { STRIPE_SECRET_KEY } = process.env;
const stripe = require("stripe")(STRIPE_SECRET_KEY);

exports.createPaymentIntent = async (data) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: data.amount,
    currency: data.currency,
  });
  res.json({ clientSecret: paymentIntent.client_secret });
};
