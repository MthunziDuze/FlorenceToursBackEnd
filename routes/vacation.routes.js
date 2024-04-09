module.exports = (app) => {
  const vacation = require("../controllers/vacation.controller.js");

  var router = require("express").Router();

  // Create a new vacation
  router.post("/", vacation.create);

  // Retrieve all vacations
  router.get("/", vacation.findAll);

  // Retrieve a single vacation with id
  router.get("/:id", vacation.findOne);

  // Update a Vacation with id
  router.put("/:id", vacation.update);

  // Delete a vacation with id
  router.delete("/:id", vacation.delete);

  app.use("/api/vacation", router);
};
