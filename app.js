/**
 * Projet brisq
 * Auteurs        : Olivier Tissot-Daguette, Théo Mirabile
 * Nom du fichier : app.js
 * Description    : 
 */

require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors());

// Parse les requêtes de content-type - application/json
app.use(express.json());

// Parse les requêtes de content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Utilisation des modèles pour la BDD
const db = require("./app/models");

// Permet la synchcronisation de la BDD avec les modèles créés
db.connection.sync();

// drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// Route basique de test pour l'API
app.get("/", (req, res) => {
  res.json({ message: "Welcome to brisq this is a test 2 !" });
});

//Importation des routes utilisées
require("./app/routes/companyType.routes")(app);
require("./app/routes/company.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/client.routes")(app);
require("./app/routes/employee.routes")(app);
require("./app/routes/reservation.routes")(app);
require("./app/routes/schedule.routes")(app);
require("./app/routes/serviceEmployee.routes")(app);
require("./app/routes/serviceType.routes")(app);

module.exports = app;