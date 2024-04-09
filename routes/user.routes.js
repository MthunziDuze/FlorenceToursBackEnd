module.exports = (app) => {
  const user = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Create a new Customer
  router.post("/", user.create);

  // Retrieve all Customers
  router.get("/", user.findAll);

  // Retrieve a single Customer with id
  router.get("/:id", user.findOne);

  // Update a Customer with id
  router.put("/:id", user.update);

  // Delete a Customer with id
  router.delete("/:id", user.delete);

  app.use("/api/user", router);
};
