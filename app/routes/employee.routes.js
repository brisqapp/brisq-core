/**
 * Projet brisq
 * Auteurs        : Olivier Tissot-Daguette, Théo Mirabile
 * Nom du fichier : employee.routes.js
 * Description    : Contient les routes pour la partie employee.
 */

module.exports = app => {
  const employee = require("../controllers/employee.controller.js");
  const { checkJwt } = require("../middleware/checkjwt.js");

  var router = require("express").Router();

  /**
 * @api {post} employee/ Creates a new employee based on a company id
 * @apiName create
 * @apiGroup Employee
 * 
 * @apiDescription Creates a new employee based on a company id
 *
 * @apiParam {String} name Name of the employee
 * @apiParam {Number} companyId ID of the linked company
 *
 * @apiSuccess  {Number} id         ID of the newly created employee
 * @apiSuccess  {String} name       Name of the newly created employee
 * @apiSuccess  {Number} companyId  ID of the linked company
 * @apiSuccess  {Date}   updatedAt  Update date of the employee record
 * @apiSuccess  {Date}   createdAt  Creation date of the employee record
 * 
 * @apiErrorExample If some fields are missing
 *    {
 *        "message": "Content can not be empty!"
 *    }
 */
  router.post("/", checkJwt ,employee.create);

  /**
 * @api {get} employee/ Get all employees of the current logged-in company
 * @apiName findAll
 * @apiGroup Employee
 * 
 * @apiDescription Get all employees of the current logged-in company
 *
 *
 * @apiSuccess  {Number} id         ID of the employee
 * @apiSuccess  {String} name       Name of the employee
 * @apiSuccess  {Number} companyId  ID of the linked company
 * @apiSuccess  {Date}   updatedAt  Update date of the employee record
 * @apiSuccess  {Date}   createdAt  Creation date of the employee record
 * 
 * @apiErrorExample If an error occured
 *    {
 *        "message": "Some error occurred while retrieving employees."
 *    }
 */
  router.get("/", checkJwt, employee.findAll);

  /**
 * @api {get} employee/ Retrieve an employee information by id
 * @apiName findOne
 * @apiGroup Employee
 * 
 * @apiDescription Retrieve an employee information by id
 *
 * @apiParam {Number} id ID of the employee
 *
 * @apiSuccess  {Number} id         ID of the employee
 * @apiSuccess  {String} name       Name of the employee
 * @apiSuccess  {Number} companyId  ID of the linked company
 * @apiSuccess  {Date}   updatedAt  Update date of the employee record
 * @apiSuccess  {Date}   createdAt  Creation date of the employee record
 * 
 * @apiErrorExample If an error occured
 *    {
 *        "message": "Error retrieving Employee with id=:id"
 *    }
 */
  router.get("/:id", employee.findOne);

  /**
 * @api {put} employee/ Update an employee information by id
 * @apiName update
 * @apiGroup Employee
 * 
 * @apiDescription Update an employee information by id
 *
 * @apiParam {Number} id ID of the employee
 *
 * @apiSuccess  {Number} id         ID of the employee
 * @apiSuccess  {String} name       Name of the employee
 * @apiSuccess  {Number} companyId  ID of the linked company
 * @apiSuccess  {Date}   updatedAt  Update date of the employee record
 * @apiSuccess  {Date}   createdAt  Creation date of the employee record
 * 
 * @apiErrorExample If an error occured
 *    {
 *        "message": "Cannot update Employee with id=:id. Maybe Employee was not found or req.body is empty!"
 *    }
 */
  router.put("/:id", employee.update);

  /**
 * @api {delete} employee/ Delete an employee by id
 * @apiName delete
 * @apiGroup Employee
 * 
 * @apiDescription Delete an employee by id
 *
 * @apiParam {Number} id ID of the employee
 *
 * @apiSuccess  {String} message  Employee was deleted successfully!
 * 
 * @apiErrorExample If an error occured
 *    {
 *        "message": "Cannot delete Employee with id=:id. Maybe Employee was not found!"
 *    }
 */
  router.delete("/:id", employee.delete);

  app.use('/api/employees', router);
};
