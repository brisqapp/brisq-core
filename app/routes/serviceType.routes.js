/**
 * Projet brisq
 * Auteurs        : Olivier Tissot-Daguette, Théo Mirabile
 * Nom du fichier : serviceType.routes.js
 * Description    : Contient les routes pour la partie serviceType.
 */

module.exports = app => {
  const serviceType = require("../controllers/serviceType.controller.js");

  var router = require("express").Router();

  /**
* @api {post} serviceType/ Create a new service type
* @apiName create
* @apiGroup ServiceType
* 
* @apiDescription Create a new service type
*
* @apiParam {String} name Name of the service type
*
* @apiSuccess  {Number} id    ID of the client
* @apiSuccess  {String} name  Name of the service type
* @apiSuccess  {Date}   updatedAt  Update date of the service type record
* @apiSuccess  {Date}   createdAt  Creation date of the service type record
* 
* @apiErrorExample If some fields are missing
*    {
*        "message": "Content can not be empty!"
*    }
*/
  router.post("/", serviceType.create);

  /**
* @api {get} serviceType/ Find all service types
* @apiName findAll
* @apiGroup ServiceType
* 
* @apiDescription Find all service types
*
* @apiSuccess  {Number} id    ID of the client
* @apiSuccess  {String} name  Name of the service type
* @apiSuccess  {Date}   updatedAt  Update date of the service type record
* @apiSuccess  {Date}   createdAt  Creation date of the service type record
* 
* @apiErrorExample If an error occured
*    {
*        "message": "Some error occurred while retrieving service types."
*    }
*/
  router.get("/", serviceType.findAll);

  /**
* @api {get} serviceType/ Get a service type information
* @apiName findOne
* @apiGroup ServiceType
* 
* @apiDescription Get a service type information
*
* @apiParam {Number} id ID of the service type
*
* @apiSuccess  {Number} id    ID of the client
* @apiSuccess  {String} name  Name of the service type
* @apiSuccess  {Date}   updatedAt  Update date of the service type record
* @apiSuccess  {Date}   createdAt  Creation date of the service type record
* 
* @apiErrorExample If an error occured
*    {
*        "message": "Error retrieving service type with id=:id"
*    }
*/
  router.get("/:id", serviceType.findOne);

  /**
* @api {put} serviceType/ Update a service type information
* @apiName update
* @apiGroup ServiceType
* 
* @apiDescription Update a service type information
*
* @apiParam {Number} id ID of the service type
*
*
* @apiParam  {Number} id    ID of the client
* @apiParam  {String} name  Name of the service type
* @apiParam  {Date}   updatedAt  Update date of the service type record
* @apiParam  {Date}   createdAt  Creation date of the service type record
*
*
* @apiSuccess  {Number} id    ID of the client
* @apiSuccess  {String} name  Name of the service type
* @apiSuccess  {Date}   updatedAt  Update date of the service type record
* @apiSuccess  {Date}   createdAt  Creation date of the service type record
* 
* @apiErrorExample If an error occured
*    {
*        "message": "Cannot update service type with id=:id. Maybe service type was not found or req.body is empty!"
*    }
*/
  router.put("/:id", serviceType.update);

  /**
* @api {delete} serviceType/ Delete a service type
* @apiName delete
* @apiGroup ServiceType
* 
* @apiDescription Delete a service type
*
* @apiParam {Number} id ID of the service type
* 
  * @apiSuccess  {String} message  service type was deleted successfully!
  * 
  * @apiErrorExample If an error occured
  *    {
  *        "message": "Cannot delete service type with id=:id. Maybe service type was not found!"
  *    }
*/
  router.delete("/:id", serviceType.delete);

  app.use('/api/serviceTypes', router);
};
