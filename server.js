const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");

let tls;
try {
  tls = require("node:tls");
} catch (err) {
  console.error("tls support is disabled!");
}

db.sequelize
  .sync()
  .then(() => {
    console.log("Sync db");
  })
  .catch((err) => {
    console.log("Failed to sync db: ", err.message);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const corsOptions = {
  AccessControlAllowOrigin: "*",
  origin: "*",
};
app.use(cors(corsOptions));

require("./routes/user.routes.js")(app);
require("./routes/customer.routes.js")(app);
require("./routes/activity.routes.js")(app);
require("./routes/location.routes.js")(app);
require("./routes/vacation.routes.js")(app);

app.listen(8000, () => {
  console.log("server listing on url", "localhost 8000");
});
