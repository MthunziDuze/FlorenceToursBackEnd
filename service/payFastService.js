const crypto = require("crypto");
const { UUID } = require("mongodb");
const endpoint_url = {
  sandbox: "https://sandbox.payfast.co.za",
  production: "https://www.payfast.co.za/eng/query/validate",
};

const { PAYFAST_MERCHANT_ID, PAYFAST_MERCHANT_KEY, PAYFAST_PASSPHRASE } =
  process.env;

const generateSignature = (data, passPhrase = null) => {
  // Create parameter string
  let pfOutput = "";
  dataK["signature"] = "";

  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      console.log(key + " " + data[key]);
      if (data[key] !== "") {
        pfOutput += `${key}=${encodeURIComponent(data[key].trim()).replace(
          /%20/g,
          "+"
        )}&`;
      }
    }
  }

  // Remove last ampersand
  let getString = pfOutput.slice(0, -1);
  if (passPhrase !== null) {
    getString += `&passphrase=${encodeURIComponent(
      PAYFAST_PASSPHRASE.trim()
    ).replace(/%20/g, "+")}`;
  }

  console.log(getString);

  return crypto.createHash("md5").update(getString).digest("hex");
};

const dataToString = (dataArray) => {
  // Convert your data array to a string
  let pfParamString = "";
  for (let key in dataArray) {
    if (dataArray.hasOwnProperty(key)) {
      pfParamString += `${key}=${encodeURIComponent(
        dataArray[key].trim()
      ).replace(/%20/g, "+")}&`;
    }
  }
  // Remove last ampersand
  return pfParamString.slice(0, -1);
};

const dataK = [];
exports.paynow = async (data) => {
  dataK["merchant_id"] = PAYFAST_MERCHANT_ID;
  dataK["merchant_key"] = PAYFAST_MERCHANT_KEY;
  // dataK["return_url"] = "https://192.168.180.77:8000/return_url";
  // dataK["cancel_url"] = "https://192.168.180.77:8000/cancel_url";
  // dataK["notify_url"] = "https://192.168.180.77:8000/notify_url";

  // dataK["name_first"] = data.given_name;
  // dataK["name_last"] = data.family_name;
  dataK["email_address"] = data.email;

  // dataK["m_payment_id"] = UUID.generate().toString("hex");
  dataK["amount"] = data.amount.toFixed(2);
  dataK["item_name"] = data.item_name;
  dataK["signature"] = generateSignature(dataK, PAYFAST_PASSPHRASE);
  const dataString = dataToString(dataK);
  const url = `${endpoint_url.sandbox}/eng/query/validate`;
  console.log("url : ", url);
  console.log("requestBody:  ", dataString);

  const res = await fetch("https://sandbox.payfast.co.za/onsite/​process", {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
    },
    body: dataString,
  });
  console.log(res);
  const jsonData = handleResponse(res);
};
exports.handleResponse = async (response) => {
  if (response.status == 200 || response.status == 201) {
    return response.json;
  }
  const errorMessage = await response.text();
  throw new Error(errorMessage);
};
