module.exports = app => {
  const employee = require("../controllers/employee.controller.js");

  var router = require("express").Router();

  // Create a new Company type
  router.post("/", employee.create);

  // Retrieve all Company types
  router.get("/", employee.findAll);

  // Retrieve a single Company type with id
  router.get("/:id", employee.findOne);

  // Update a Company type with id
  router.put("/:id", employee.update);

  // Delete a Company type with id
  router.delete("/:id", employee.delete);

  app.use('/api/employees', router);
};
