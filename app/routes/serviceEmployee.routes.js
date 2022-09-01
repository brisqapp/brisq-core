module.exports = app => {
  const serviceEmployee = require("../controllers/serviceEmployee.controller.js");

  var router = require("express").Router();

  // Create a new Company type
  router.post("/", serviceEmployee.create);

  // Retrieve all Company types
  router.get("/", serviceEmployee.findAll);

  // Retrieve a single Company type with id
  router.get("/:id", serviceEmployee.findOne);

  // Update a Company type with id
  router.put("/:id", serviceEmployee.update);

  // Delete a Company type with id
  router.delete("/:id", serviceEmployee.delete);

  app.use('/api/serviceEmployees', router);
};
