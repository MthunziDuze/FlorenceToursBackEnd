module.exports = (app) => {
  const activity = require("../controllers/activity.controller.js");

  var router = require("express").Router();

  // Create a new acivity
  router.post("/", activity.create);

  // Retrieve all activity
  router.get("/", activity.findAll);

  // Retrieve a single activity with id
  router.get("/:id", activity.findOne);

  // Update a activity with id
  router.put("/:id", activity.update);

  // Delete a activity with id
  router.delete("/:id", activity.delete);

  app.use("/api/activity", router);
};
