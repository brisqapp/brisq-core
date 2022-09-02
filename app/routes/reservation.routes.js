module.exports = app => {
  const reservation = require("../controllers/reservation.controller.js");

  var router = require("express").Router();

  /**
 * @api {post} employee/ Creates a new reservation based on a client id and a serviceEmployee id
 * @apiName create
 * @apiGroup Reservation
 * 
 * @apiDescription Creates a new reservation based on a client id and a serviceEmployee id
 *
 * @apiParam {Time} startHour Start hour of the reservation
 * @apiParam {Date} date Date of the reservation
 * @apiParam {Number} clientId ID of the client
 * @apiParam {Number} serviceEmployeeId ID of the serviceEmployee
 *
 * @apiSuccess  {Number} id         ID of the newly created reservation
 * @apiSuccess  {Time} startHour    Start hour of the reservation
 * @apiSuccess  {Date} date         Date of the reservation
 * @apiSuccess  {Number} clientId   ID of the client who made the reservation
 * @apiSuccess  {Date}   updatedAt  Update date of the reservation record
 * @apiSuccess  {Date}   createdAt  Creation date of the reservation record
 * 
 * @apiErrorExample If some fields are missing
 *    {
 *        "message": "Content can not be empty!"
 *    }
 */
  router.post("/", reservation.create);

  /**
 * @api {get} reservation/ Retrieve all reservations of the currently logged-in company
 * @apiName findAll
 * @apiGroup Reservation
 * 
 * @apiDescription Retrieve all reservations of the currently logged-in company
 *
 * @apiSuccess  {Number} id         ID of the reservation
 * @apiSuccess  {Time} startHour    Start hour of the reservation
 * @apiSuccess  {Date} date         Date of the reservation
 * @apiSuccess  {Number} clientId   ID of the client who made the reservation
 * @apiSuccess  {Date}   updatedAt  Update date of the reservation record
 * @apiSuccess  {Date}   createdAt  Creation date of the reservation record
 * 
 * @apiErrorExample If an error occured
 *    {
 *        "message": "Some error occurred while retrieving reservations."
 *    }
 */
  router.get("/", reservation.findAll);

  /**
 * @api {get} reservation/ Retrieve a reservation information by id
 * @apiName findOne
 * @apiGroup Reservation
 * 
 * @apiDescription Retrieve a reservation information by id
 * 
 * @apiParam {Number} id ID of the reservation
 *
 * @apiSuccess  {Number} id         ID of the reservation
 * @apiSuccess  {Time} startHour    Start hour of the reservation
 * @apiSuccess  {Date} date         Date of the reservation
 * @apiSuccess  {Number} clientId   ID of the client who made the reservation
 * @apiSuccess  {Date}   updatedAt  Update date of the reservation record
 * @apiSuccess  {Date}   createdAt  Creation date of the reservation record
 * 
 * @apiErrorExample If an error occured
 *    {
 *        "message": "Error retrieving Reservation with id=:id"
 *    }
 */
  router.get("/:id", reservation.findOne);

  /**
 * @api {put} reservation/ Update a reservation information by id
 * @apiName update
 * @apiGroup Reservation
 * 
 * @apiDescription Update a reservation information by id
 *
 * @apiSuccess  {Number} id         ID of the newly created reservation
 * @apiSuccess  {Time} startHour    Start hour of the reservation
 * @apiSuccess  {Date} date         Date of the reservation
 * @apiSuccess  {Number} clientId   ID of the client who made the reservation
 * @apiSuccess  {Date}   updatedAt  Update date of the reservation record
 * @apiSuccess  {Date}   createdAt  Creation date of the reservation record
 * 
 * @apiErrorExample If an error occured
 *    {
 *        "message": "Cannot update Reservation with id=:id. Maybe Reservation was not found or req.body is empty!"
 *    }
 */
  router.put("/:id", reservation.update);

  /**
 * @api {put} reservation/ Delete a reservation by id
 * @apiName delete
 * @apiGroup Reservation
 * 
 * @apiDescription Delete a reservation by id
 * 
 * @apiSuccess  {String} message  Reservation was deleted successfully!
 * 
 * @apiErrorExample If an error occured
 *    {
 *        "message": "Cannot delete Reservation with id=:id. Maybe Reservation was not found!"
 *    }
 */
  router.delete("/:id", reservation.delete);

  app.use('/api/reservations', router);
};
