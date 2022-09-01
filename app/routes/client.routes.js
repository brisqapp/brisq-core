module.exports = app => {
  const client = require("../controllers/client.controller.js");

  var router = require("express").Router();

  // Create a new Company type
  router.post("/", client.create);

  // Retrieve all Company types
  router.get("/", client.findAll);

  // Retrieve a single Company type with id
  router.get("/:id", client.findOne);

  // Update a Company type with id
  router.put("/:id", client.update);

  // Delete a Company type with id
  router.delete("/:id", client.delete);

  app.use('/api/clients', router);
};
