const { companyType } = require("../models/index.js");

module.exports = app => {
  const company = require("../controllers/company.controller.js");

  var router = require("express").Router();

  // Create a new Company
  router.post("/", company.create);

  // Retrieve all company
  router.get("/", company.findAll);

  // Retrieve a single Company with id
  router.get("/:id", company.findOne);

  // Update a Company with id
  router.put("/:id", company.update);

  // Delete a Company with id
  router.delete("/:id", company.delete);



  app.use('/api/companies', router);
};
