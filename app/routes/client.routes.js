module.exports = app => {
  const client = require("../controllers/client.controller.js");

  var router = require("express").Router();

  /**
 * @api {post} client/ Create a new client
 * @apiName Create
 * @apiGroup Client
 * 
 * @apiDescription Creates a new client and inserts it into the database
 *
 * @apiParam {String} firstname First name of the user.
 * @apiParam {String} lastname    Last name of the user.
 * @apiParam {String} email       E-mail of the user.
 *
 *
 */
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
