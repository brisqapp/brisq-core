module.exports = app => {
  const schedule = require("../controllers/schedule.controller.js");

  var router = require("express").Router();

  /**
  * @api {post} schedule/ Creates a new schedule based on an employee id
  * @apiName create
  * @apiGroup Schedule
  * 
  * @apiDescription Creates a new schedule based on an employee id
  *
  * @apiParam {Number} weekday Day of the week, between 1 (monday) and 7 (sunday)
  * @apiParam {Time} morningBegin Start time in the morning
  * @apiParam {Time} morningEnd End time in the morning
  * @apiParam {Time} afternoonBegin Begin time in the afternoon
  * @apiParam {Time} afternoonEnd End time in the afternoon
  * @apiParam {Number} employeeId ID of the employee
  *
  * @apiSuccess  {Number} id         ID of the newly created schedule
  * @apiSuccess  {Number} weekday    Day of the week, between 1 (monday) and 7 (sunday)
  * @apiSuccess  {Time} morningBegin Start time in the morning
  * @apiSuccess  {Time} morningEnd End time in the morning
  * @apiSuccess  {Time} afternoonBegin Begin time in the afternoon
  * @apiSuccess  {Time} afternoonEnd End time in the afternoon
  * @apiSuccess  {Number} employeeId ID of the employee
  * @apiSuccess  {Date} updatedAt  Update date of the schedule record
  * @apiSuccess  {Date} createdAt  Creation date of the schedule record
  * 
  * @apiErrorExample If some fields are missing
  *    {
  *        "message": "Content can not be empty!"
  *    }
  */
  router.post("/", schedule.create);

  /**
* @api {get} schedule/ Find all schedules of all employees the current logged-in company
* @apiName findAll
* @apiGroup Schedule
* 
* @apiDescription Find all schedules of all employees the current logged-in company
*
* @apiSuccess  {Number} id         ID of the newly created schedule
* @apiSuccess  {Number} weekday    Day of the week, between 1 (monday) and 7 (sunday)
* @apiSuccess  {Time} morningBegin Start time in the morning
* @apiSuccess  {Time} morningEnd End time in the morning
* @apiSuccess  {Time} afternoonBegin Begin time in the afternoon
* @apiSuccess  {Time} afternoonEnd End time in the afternoon
* @apiSuccess  {Number} employeeId ID of the employee
* @apiSuccess  {Date} updatedAt  Update date of the schedule record
* @apiSuccess  {Date} createdAt  Creation date of the schedule record
* 
* @apiErrorExample If an error occured
*    {
*        "message": "Some error occurred while retrieving schedules."
*    }
*/
  router.get("/", schedule.findAll);

  /**
* @api {get} schedule/ Get a schedule information by id
* @apiName findAll
* @apiGroup Schedule
* 
* @apiDescription Get a schedule information by id
* 
* @apiParam {Number} id ID of the schedule
*
* @apiSuccess  {Number} id         ID of the newly created schedule
* @apiSuccess  {Number} weekday    Day of the week, between 1 (monday) and 7 (sunday)
* @apiSuccess  {Time} morningBegin Start time in the morning
* @apiSuccess  {Time} morningEnd End time in the morning
* @apiSuccess  {Time} afternoonBegin Begin time in the afternoon
* @apiSuccess  {Time} afternoonEnd End time in the afternoon
* @apiSuccess  {Number} employeeId ID of the employee
* @apiSuccess  {Date} updatedAt  Update date of the schedule record
* @apiSuccess  {Date} createdAt  Creation date of the schedule record
* 
* @apiErrorExample If an error occured
*    {
*        "message": "Error retrieving schedule with id=:id"
*    }
*/
  router.get("/:id", schedule.findOne);

  /**
* @api {put} schedule/ Update a schedule information by id
* @apiName update
* @apiGroup Schedule
* 
* @apiDescription Update a schedule information by id
* 
* @apiParam {Number} id ID of the schedule
*
* @apiParam  {Number} id         ID of the newly created schedule
* @apiParam  {Number} weekday    Day of the week, between 1 (monday) and 7 (sunday)
* @apiParam  {Time} morningBegin Start time in the morning
* @apiParam  {Time} morningEnd End time in the morning
* @apiParam  {Time} afternoonBegin Begin time in the afternoon
* @apiParam  {Time} afternoonEnd End time in the afternoon
* @apiParam  {Number} employeeId ID of the employee
* @apiParam  {Date} updatedAt  Update date of the schedule record
* @apiParam  {Date} createdAt  Creation date of the schedule record
*
* @apiSuccess  {Number} id         ID of the newly created schedule
* @apiSuccess  {Number} weekday    Day of the week, between 1 (monday) and 7 (sunday)
* @apiSuccess  {Time} morningBegin Start time in the morning
* @apiSuccess  {Time} morningEnd End time in the morning
* @apiSuccess  {Time} afternoonBegin Begin time in the afternoon
* @apiSuccess  {Time} afternoonEnd End time in the afternoon
* @apiSuccess  {Number} employeeId ID of the employee
* @apiSuccess  {Date} updatedAt  Update date of the schedule record
* @apiSuccess  {Date} createdAt  Creation date of the schedule record
* 
* @apiErrorExample If an error occured
*    {
*        "message": "Cannot update schedule with id=:id. Maybe schedule was not found or req.body is empty!"
*    }
*/
  router.put("/:id", schedule.update);


  /**
  * @api {delete} schedule/ Delete a schedule by id
  * @apiName delete
  * @apiGroup Schedule
  * 
  * @apiDescription Delete a schedule by id
  * 
  * @apiParam {Number} id ID of the schedule
  *
  * @apiSuccess  {String} message  Schedule was deleted successfully!
  * 
  * @apiErrorExample If an error occured
  *    {
  *        "message": "Cannot delete schedule with id=:id. Maybe schedule was not found!"
  *    }
  */
  router.delete("/:id", schedule.delete);

  app.use('/api/schedules', router);
};
