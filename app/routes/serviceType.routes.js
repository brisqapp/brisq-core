module.exports = app => {
  const serviceType = require("../controllers/serviceType.controller.js");

  var router = require("express").Router();

  // Create a new Company type
  router.post("/", serviceType.create);

  // Retrieve all Company types
  router.get("/", serviceType.findAll);

  // Retrieve a single Company type with id
  router.get("/:id", serviceType.findOne);

  // Update a Company type with id
  router.put("/:id", serviceType.update);

  // Delete a Company type with id
  router.delete("/:id", serviceType.delete);

  app.use('/api/serviceTypes', router);
};
