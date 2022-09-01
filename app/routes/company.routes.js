const { default: checkJwt } = require("../middleware/checkjwt.js");
const { companyType } = require("../models/index.js");

module.exports = app => {
  const company = require("../controllers/company.controller.js");

  var router = require("express").Router();

  // Create a new Company
  router.post("/", company.create);

  // Retrieve a single Company with id
  router.get("/", checkJwt, company.findOne);

  // Update a Company with id
  router.put("/", checkJwt , company.update);

  // Delete a Company with id
  router.delete("/", checkJwt, company.delete);

  app.use('/api/companies', router);
};
