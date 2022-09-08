/**
 * Projet brisq
 * Auteurs        : Olivier Tissot-Daguette, Théo Mirabile
 * Nom du fichier : client.routes.js
 * Description    : Contient les routes pour la partie client.
 */

const { checkJwt } = require("../middleware/checkjwt.js");
const { companyType } = require("../models/index.js");

module.exports = app => {
  const company = require("../controllers/company.controller.js");

  var router = require("express").Router();

  /**
 * @api {post} client/ Create a new company
 * @apiName create
 * @apiGroup Company
 * 
 * @apiDescription Creates a new company and inserts it into the database
 *
 * @apiParam {String} firstName   First name of the company owner.
 * @apiParam {String} lastName    Last name of the company owner.
 * @apiParam {String} email       E-mail of the company owner.
 * @apiParam {String} password    Password of the company owner.
 * @apiParam {String} companyName Name of the company
 * @apiParam {String} address     Address of the company
 * @apiParam {Number} postalCode  Postal code
 * @apiParam {String} city        City of the company
 * @apiParam {Number} companyTypeId ID of the company type

 * 
 *
 * @apiSuccess {String} firstName   First name of the company owner.
 * @apiSuccess {String} lastName    Last name of the company owner.
 * @apiSuccess {String} email       E-mail of the company owner.
 * @apiSuccess {String} password    Password of the company owner.
 * @apiSuccess {String} companyName Name of the company
 * @apiSuccess {String} address     Address of the company
 * @apiSuccess {Number} postalCode  Postal code
 * @apiSuccess {String} city        City of the company
 * @apiSuccess {Number} companyTypeId ID of the company type
 * @apiSuccess  {Date}   updatedAt  Update date of the company record
 * @apiSuccess  {Date}   createdAt  Creation date of the company record
 * @apiSuccess {String} token Authentication token of the user
 * 
 * @apiErrorExample If some fields are missing
 *    {
 *        "message": "Content can not be empty!"
 *    }
 */
  router.post("/", company.create);



  /**
 * @api {get} company/ Get the current logged-in company info
 * @apiName findOne
 * @apiGroup Company
 * 
 * @apiDescription Get the current logged-in company info
 * 
 *
 * @apiSuccess {String} firstName   First name of the company owner.
 * @apiSuccess {String} lastName    Last name of the company owner.
 * @apiSuccess {String} email       E-mail of the company owner.
 * @apiSuccess {String} password    Password of the company owner.
 * @apiSuccess {String} companyName Name of the company
 * @apiSuccess {String} address     Address of the company
 * @apiSuccess {Number} postalCode  Postal code
 * @apiSuccess {String} city        City of the company
 * @apiSuccess {Number} companyTypeId ID of the company type
 * @apiSuccess  {Date}   updatedAt  Update date of the company record
 * @apiSuccess  {Date}   createdAt  Creation date of the company record
 * 
 * 
 * @apiErrorExample If an error occured
 *    {
 *        "message": "Error retrieving Company"
 *    }
 * 
 */
  router.get("/", checkJwt, company.findOne);

  /**
 * @api {put} company/ Update the current logged-in company info
 * @apiName update
 * @apiGroup Company
 * 
 * @apiDescription Update the current logged-in company info
 * 
 * @apiParam {String} firstName   First name of the company owner.
 * @apiParam {String} lastName    Last name of the company owner.
 * @apiParam {String} email       E-mail of the company owner.
 * @apiParam {String} password    Password of the company owner.
 * @apiParam {String} companyName Name of the company
 * @apiParam {String} address     Address of the company
 * @apiParam {Number} postalCode  Postal code
 * @apiParam {String} city        City of the company
 * @apiParam {Number} companyTypeId ID of the company type

 * 
 *
 * @apiSuccess {String} firstName   First name of the company owner.
 * @apiSuccess {String} lastName    Last name of the company owner.
 * @apiSuccess {String} email       E-mail of the company owner.
 * @apiSuccess {String} password    Password of the company owner.
 * @apiSuccess {String} companyName Name of the company
 * @apiSuccess {String} address     Address of the company
 * @apiSuccess {Number} postalCode  Postal code
 * @apiSuccess {String} city        City of the company
 * @apiSuccess {Number} companyTypeId ID of the company type
 * @apiSuccess  {Date}   updatedAt  Update date of the company record
 * @apiSuccess  {Date}   createdAt  Creation date of the company record
 * 
 * @apiErrorExample If an error occured
 *    {
 *        "message": "Cannot update Company with id=:id. Maybe Company was not found or req.body is empty!"
 *    }
 * 
 * 
 */
  router.put("/", checkJwt, company.update);

  /**
   * @api {delete} company/ Delete the current logged-in company
   * @apiName delete
   * @apiGroup Company
   * 
   * @apiDescription Delete the current logged-in company
   * 
   * @apiSuccess  {String} message Company was deleted successfully!
   * 
   * @apiErrorExample If an error occured
   *    {
   *        "message": "Cannot delete Company with id=:id. Maybe Company was not found!"
   *    }
   * 
   */
  router.delete("/", checkJwt, company.delete);

  // Retrieve details of a Company and his employees (schedule, reservations)
  router.get("/getCompanyDetails/:id", company.getCompanyDetails);

  app.use('/api/companies', router);
};
