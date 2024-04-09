require("dotenv").config();
const userController = require("../controllers/user.controller");

exports.loginUser = async (access_token) => {
  const googleUserinfoUrl = `${process.env.GOOGLE_PROFILE_URL}?access_token=${access_token}`;

  console.log("GoogleProfile url: ", googleUserinfoUrl);

  const response = await fetch(googleUserinfoUrl, {
    method: "Get",
    headers: {
      "Content-Type": "applications/json",
      Autherization: `Brearer ${access_token}`,
      AccessControlAllowOrigin: "*",
    },
  });
  return handleResponse(response);
};

exports.signupUser = async (req, res) => {
  return userController.createUser;
};
function handleResponse(response) {
  if (response.status == 200 || response.status == 201) {
    return response.json();
  }
  const errorMessage = response.text();
  throw new Error(errorMessage);
}
