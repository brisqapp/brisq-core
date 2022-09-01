module.exports = app => {
  const schedule = require("../controllers/schedule.controller.js");

  var router = require("express").Router();

  // Create a new Company type
  router.post("/", schedule.create);

  // Retrieve all Company types
  router.get("/", schedule.findAll);

  // Retrieve a single Company type with id
  router.get("/:id", schedule.findOne);

  // Update a Company type with id
  router.put("/:id", schedule.update);

  // Delete a Company type with id
  router.delete("/:id", schedule.delete);

  app.use('/api/schedules', router);
};
