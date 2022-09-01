module.exports = app => {
  const reservation = require("../controllers/reservation.controller.js");
  const { checkJwt } = require("../middleware/checkjwt.js");

  var router = require("express").Router();

  // Create a new Company type
  router.post("/", reservation.create);

  // Retrieve all Company types
  router.get("/", checkJwt , reservation.findAll);

  // Retrieve a single Company type with id
  router.get("/:id", reservation.findOne);

  // Update a Company type with id
  router.put("/:id", reservation.update);

  // Delete a Company type with id
  router.delete("/:id", reservation.delete);

  app.use('/api/reservations', router);
};
