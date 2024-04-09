module.exports = (app) => {
  const customer = require("../controllers/customer.controller.js");

  var router = require("express").Router();

  // Create a new Customer
  router.post("/", customer.create);

  // Retrieve all Customers
  router.get("/", customer.findAll);

  // Retrieve a single Customer with id
  router.get("/:id", customer.findOne);

  // Update a Customer with id
  router.put("/:id", customer.update);

  // Delete a Customer with id
  router.delete("/:id", customer.delete);

  app.use("/api/customer", router);
};
