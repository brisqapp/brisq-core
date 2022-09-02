module.exports = app => {
  const companyType = require("../controllers/companyType.controller.js");

  var router = require("express").Router();

  /**
 * @api {post} companyType/ Create a new CompanyType
 * @apiName create
 * @apiGroup CompanyType
 * 
 * @apiDescription Creates a new company type and inserts it into the database
 *
 * @apiParam {String} name Name of the company type
 *
 * @apiSuccess  {Number} id         ID of the company type
 * @apiSuccess  {String} name       Name of the company type
 * @apiSuccess  {Date}   updatedAt  Update date of the company type record
 * @apiSuccess  {Date}   createdAt  Creation date of the company type record
 * 
 * @apiErrorExample If some fields are missing
 *    {
 *        "message": "Content can not be empty!"
 *    }
 */
  router.post("/", companyType.create);


  /**
 * @api {get} companyType/ Find all company types
 * @apiName findAll
 * @apiGroup CompanyType
 * 
 * @apiDescription Find all company types
 *
 * @apiSuccess  {Number} id         ID of the company type
 * @apiSuccess  {String} name  Name of the company type
 * @apiSuccess  {Date}   updatedAt  Update date of the company type record
 * @apiSuccess  {Date}   createdAt  Creation date of the company type record
 * 
 * @apiErrorExample If an error occured
 *    {
 *        "message": "Some error occurred while retrieving company types."
 *    }
 * 
 */
  router.get("/", companyType.findAll);

  /**
   * @api {get} companyType/:id Get a company type by id
   * @apiName findOne
   * @apiGroup CompanyType
   * 
   * @apiDescription Get a company type by id
   * 
   * @apiParam {Number} id  ID of the company type
   *
   * @apiSuccess  {Number} id         ID of the company type
   * @apiSuccess  {String} name  Name of the company type
   * @apiSuccess  {Date}   updatedAt  Update date of the company type record
   * @apiSuccess  {Date}   createdAt  Creation date of the company type record
   * 
   * 
   * @apiErrorExample If an error occured
   *    {
   *        "message": "Error retrieving Company type with id=:id"
   *    }
   * 
   */
  router.get("/:id", companyType.findOne);

  /**
 * @api {put} companyType/:id Update a company type by id
 * @apiName update
 * @apiGroup CompanyType
 * 
 * @apiDescription Update a company type by id 
 * 
 * @apiParam {Number} id  ID of the company type
 *
 * @apiSuccess  {Number} id         ID of the company type
 * @apiSuccess  {String} name  Name of the company type
 * @apiSuccess  {Date}   updatedAt  Update date of the company type record
 * @apiSuccess  {Date}   createdAt  Creation date of the company type record
 * 
 * @apiErrorExample If an error occured
 *    {
 *        "message": "Cannot update Company type with id=:id. Maybe Company type was not found or req.body is empty!"
 *    }
 * 
 * 
 */
  router.put("/:id", companyType.update);

  /**
 * @api {delete} companyType/:id Delete a company tyoe by id
 * @apiName delete
 * @apiGroup CompanyType
 * 
 * @apiDescription Delete a company type by id
 * 
 * @apiParam {Number} id  ID of the company type
 *
 * @apiSuccess  {String} message Company type was deleted successfully!
 * 
 * @apiErrorExample If an error occured
 *    {
 *        "message": "Cannot delete Company type with id=:id. Maybe Company type was not found!"
 *    }
 * 
 */
  router.delete("/:id", companyType.delete);

  app.use('/api/companyTypes', router);
};
