/**
 * Projet brisq
 * Auteurs        : Olivier Tissot-Daguette, Théo Mirabile
 * Nom du fichier : serviceEmployee.routes.js
 * Description    : Contient les routes pour la partie serviceEmployee.
 */

module.exports = app => {
  const serviceEmployee = require("../controllers/serviceEmployee.controller.js");

  var router = require("express").Router();

  /**
* @api {post} serviceEmployee/ Creates a new employee service based on an employee id
* @apiName create
* @apiGroup ServiceEmployee
* 
* @apiDescription Creates a new employee service based on an employee id
*
* @apiParam {Number} employeeId ID of the employee
* @apiParam {Number} serviceTypeId ID of the service type
* @apiParam {Number} duration Duration of the service in minutes
*
* @apiSuccess  {Number} id         ID of the newly created schedule
* @apiSuccess  {Number} employeeId ID of the employee
* @apiSuccess  {Number} serviceTypeId ID of the service type
* @apiSuccess  {Number} duration Duration of the service in minutes
* @apiSuccess  {Date} updatedAt  Update date of the service record
* @apiSuccess  {Date} createdAt  Creation date of the service record
* 
* @apiErrorExample If some fields are missing
*    {
*        "message": "Content can not be empty!"
*    }
*/
  router.post("/", serviceEmployee.create);

  /**
* @api {get} serviceEmployee/ Find all employee services of the current logged-in company
* @apiName findAll
* @apiGroup ServiceEmployee
* 
* @apiDescription Find all employee services of the current logged-in company
*
* @apiSuccess  {Number} id         ID of the newly created schedule
* @apiSuccess  {Number} employeeId ID of the employee
* @apiSuccess  {Number} serviceTypeId ID of the service type
* @apiSuccess  {Number} duration Duration of the service in minutes
* @apiSuccess  {Date} updatedAt  Update date of the service record
* @apiSuccess  {Date} createdAt  Creation date of the service record
* 
* @apiErrorExample If an error occured
*    {
*        "message": "Some error occurred while retrieving employee services."
*    }
*/
  router.get("/", serviceEmployee.findAll);

  /**
* @api {get} serviceEmployee/ Get an employee service information by id
* @apiName findOne
* @apiGroup ServiceEmployee
* 
* @apiDescription Get an employee service information by id
*
* @apiSuccess  {Number} id         ID of the newly created schedule
* @apiSuccess  {Number} employeeId ID of the employee
* @apiSuccess  {Number} serviceTypeId ID of the service type
* @apiSuccess  {Number} duration Duration of the service in minutes
* @apiSuccess  {Date} updatedAt  Update date of the service record
* @apiSuccess  {Date} createdAt  Creation date of the service record
* 
* @apiErrorExample If an error occured
*    {
*        "message": "Error retrieving employee service with id=:id"
*    }
*/
  router.get("/:id", serviceEmployee.findOne);

  /**
* @api {put} serviceEmployee/ Update an employee service information by id
* @apiName update
* @apiGroup ServiceEmployee
* 
* @apiDescription Update an employee service information by id
*
* @apiSuccess  {Number} id         ID of the newly created schedule
* @apiSuccess  {Number} employeeId ID of the employee
* @apiSuccess  {Number} serviceTypeId ID of the service type
* @apiSuccess  {Number} duration Duration of the service in minutes
* @apiSuccess  {Date} updatedAt  Update date of the service record
* @apiSuccess  {Date} createdAt  Creation date of the service record
* 
* @apiErrorExample If an error occured
*    {
*        "message": "Cannot update employee service with id=:id. Maybe employee service was not found or req.body is empty!"
*    }
*/
  router.put("/:id", serviceEmployee.update);

  /**
* @api {delete} serviceEmployee/ Delete an employee service
* @apiName delete
* @apiGroup ServiceEmployee
* 
* @apiDescription Delete an employee service
*
* 
* @apiErrorExample If an error occured
*    {
*        "message": "Cannot delete employee service with id=:id. Maybe employee service was not found!"
*    }
*/
  router.delete("/:id", serviceEmployee.delete);

  app.use('/api/serviceEmployees', router);
};
