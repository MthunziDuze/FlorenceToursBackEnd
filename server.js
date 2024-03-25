const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
//const tls = require('node:tls');
const configEnv = require("dotenv");

const payPalService = require("./service/paypal-service");
const stripeService = require("./service/stripe-service.js");
const googleService = require("./service/google-service.js");
const payFastService = require("./service/payFastService.js");
const { default: axios } = require("axios");
let tls;
try {
  tls = require("node:tls");
} catch (err) {
  console.error("tls support is disabled!");
}
// const  PayPalService  pathToSwaggerUi from ("swagger-ui-dist").absolutePath();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const corsOptions = {
  // origin:'https://abc.onrender.com',
  AccessControlAllowOrigin: "*",
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
app.use(cors(corsOptions));

app.get("/login", async (req, res) => {
  console.log("inside Login: ", req.headers);
  const { access_token } = req.headers;
  try {
    const profile = await googleService.loginUser(access_token);
    return res.send(profile);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/create_order", async (req, res) => {
  try {
    const order = await payPalService.create_order(req.body);
    res.json(order);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/create-checkout-session", async (req, res) => {
  try {
    const { payIntent } = req.body;
    const paymentIntent = stripeService.createPaymentIntent(req.body);
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

const myData = {};

const { PAYFAST_MERCHANT_ID, PAYFAST_MERCHANT_KEY, PAYFAST_PASSPHRASE } =
  process.env;

app.post("/payfast", async (req, res) => {
  const obj = req.body;
  myData.merchant_id = PAYFAST_MERCHANT_ID;
  myData.merchant_key = PAYFAST_MERCHANT_KEY;
  myData.amount = req.body.amount;
  myData.item_name = req.body.item_name;

  console.log(req.body);
  console.log(myData);

  const result = await axios
    .post("https://sandbox.payfast.co.za​/eng/process", myData)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => console.log(err));
});
app.listen(8000, () => {
  console.log("server listing on url", "localhost 8000");
});
