const endpoint_url = {
  sandbox: "https://sandbox.paypal.com",
  production: "https://api-m.paypal.com",
};
const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PORT = 8888 } = process.env;

exports.generateAccessToken = async () => {
  const auth = Buffer.from(
    CLIENT_ID + ":" + CLIENT_SECRET
  ).toString("base64");
  const data = "grant_type=client_credentials";
  const url = `${endpoint_url.sandbox}/v1/oauth2/token`;
  console.log("url : ", url);
  const res = await fetch(url, {
    method: "Post",
    headers: {
      "Content-Type": "applicatioms/x-www-form-urlencoded",
      Autherization: `Basic ${auth}`,
    },
    body: data,
  });
  const jsonData = await handleResponse(res);
  return jsonData.access_token;
};
exports.handleResponse = async (response) => {
  if (response.status == 200 || response.status == 201) {
    return response.json;
  }
  const errorMessage = await response.text();
  throw new Error(errorMessage);
};
exports.create_order = async (data) => {
  const accessToken = await generateAccessToken();
  const url = `${endpoint_url.sandbox}/v2/checkout/orders`;
  console.log("url : ", url);
  const response = await fetch(url, {
    method: "Post",
    headers: {
      "Content-Type": "applicatioms/x-www-form-urlencoded",
      Autherization: `Basic ${auth}`,
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: data.product.cost,
          },
        },
      ],
    }),
  });

  return handleResponse(response);
};
exports.capturePayment = async (orderId) => {
  const access_token = await generateAccessToken();
  const url = `${endpoint_url.sandbox}/v2/checkout/orders/${orderId}/capture`;

  const response = await fetch(url, {
    method: "Post",
    headers: {
      "Content-Type": "applicatioms/json",
      Autherization: "Brearer ${accessToken}",
    },
  });
  return handleResponse(response);
};
