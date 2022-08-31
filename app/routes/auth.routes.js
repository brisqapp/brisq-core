module.exports = app => {
  const auth = require("../controllers/auth.controller.js");

  var router = require("express").Router();

  // Create a new Company
  router.post("/", auth.login);

  app.use('/api/auth', router);
};
