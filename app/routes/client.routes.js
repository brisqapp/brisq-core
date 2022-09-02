module.exports = app => {
  const client = require("../controllers/client.controller.js");

  var router = require("express").Router();

  /**
 * @api {post} client/ Create a new client
 * @apiName create
 * @apiGroup Client
 * 
 * @apiDescription Creates a new client and inserts it into the database
 *
 * @apiParam {String} firstName First name of the client.
 * @apiParam {String} lastName    Last name of the client.
 * @apiParam {String} email       E-mail of the client.
 *
 * @apiSuccess  {Number} id         ID of the client
 * @apiSuccess  {String} firstName  First name of the client
 * @apiSuccess  {String} lastName   Last name of the client
 * @apiSuccess  {String} email      Email of the client
 * @apiSuccess  {Date}   updatedAt  Update date of the client record
 * @apiSuccess  {Date}   createdAt  Creation date of the client record
 * 
 * @apiErrorExample If some fields are missing
 *    {
 *        "message": "Content can not be empty!"
 *    }
 */
  router.post("/", client.create);

  /**
 * @api {get} client/ Find all registered clients
 * @apiName findAll
 * @apiGroup Client
 * 
 * @apiDescription Find all registered clients
 *
 * @apiSuccess  {Number} id         ID of the client
 * @apiSuccess  {String} firstName  First name of the client
 * @apiSuccess  {String} lastName   Last name of the client
 * @apiSuccess  {String} email      Email of the client
 * @apiSuccess  {Date}   updatedAt  Update date of the client record
 * @apiSuccess  {Date}   createdAt  Creation date of the client record
 * 
 * @apiErrorExample If an error occured
 *    {
 *        "message": "Some error occurred while retrieving clients."
 *    }
 * 
 */
  router.get("/", client.findAll);

  /**
 * @api {get} client/:id Get a client by id
 * @apiName findOne
 * @apiGroup Client
 * 
 * @apiDescription Get a client by id
 * 
 * @apiParam {Number} id  ID of the client
 *
 * @apiSuccess  {Number} id         ID of the client
 * @apiSuccess  {String} firstName  First name of the client
 * @apiSuccess  {String} lastName   Last name of the client
 * @apiSuccess  {String} email      Email of the client
 * @apiSuccess  {Date}   updatedAt  Update date of the client record
 * @apiSuccess  {Date}   createdAt  Creation date of the client record
 * 
 * 
 * @apiErrorExample If an error occured
 *    {
 *        "message": "Error retrieving Client with id=:id"
 *    }
 * 
 */
  router.get("/:id", client.findOne);


  /**
 * @api {put} client/:id Update a client by id
 * @apiName update
 * @apiGroup Client
 * 
 * @apiDescription Update a client by id
 * 
 * @apiParam {Number} id          ID of the client
 * @apiParam {String} firstname   First name of the client.
 * @apiParam {String} lastname    Last name of the client.
 * @apiParam {String} email       E-mail of the client.
 *
 * @apiSuccess  {Number} id         ID of the client
 * @apiSuccess  {String} firstName  First name of the client
 * @apiSuccess  {String} lastName   Last name of the client
 * @apiSuccess  {String} email      Email of the client
 * @apiSuccess  {Date}   updatedAt  Update date of the client record
 * @apiSuccess  {Date}   createdAt  Creation date of the client record
 * 
 * @apiErrorExample If an error occured
 *    {
 *        "message": "Cannot update Client with id=:id. Maybe Client was not found or req.body is empty!"
 *    }
 * 
 * 
 */
  router.put("/:id", client.update);

  /**
 * @api {delete} client/:id Delete a client by id
 * @apiName delete
 * @apiGroup Client
 * 
 * @apiDescription Delete a client by id
 * 
 * @apiParam {Number} id          ID of the client
 *
 * @apiSuccess  {String} message  Client was deleted successfully!
 * 
 * @apiErrorExample If an error occured
 *    {
 *        "message": "Cannot delete Client with id=:id. Maybe Client was not found!"
 *    }
 * 
 */
  router.delete("/:id", client.delete);

  app.use('/api/clients', router);
};
