module.exports = app => {
  const companyType = require("../controllers/companyType.controller.js");

  var router = require("express").Router();

  // Create a new Company type
  router.post("/", companyType.create);

  // Retrieve all Company types
  router.get("/", companyType.findAll);

  // Retrieve a single Company type with id
  router.get("/:id", companyType.findOne);

  // Update a Company type with id
  router.put("/:id", companyType.update);

  // Delete a Company type with id
  router.delete("/:id", companyType.delete);

  app.use('/api/companyTypes', router);
};
