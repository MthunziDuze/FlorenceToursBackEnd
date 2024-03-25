require("dotenv").config();

exports.loginUser = async (access_token) => {
  const profileUrl = process.env.GOOGLE_PROFILE_URL;
  const googleUserinfoUrl = `${profileUrl}?access_token=${access_token}`;

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
function handleResponse(response) {
  if (response.status == 200 || response.status == 201) {
    const res = response.body;

    return response.json();
  }
  const errorMessage = response.text();
  throw new Error(errorMessage);
}
