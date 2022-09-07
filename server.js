require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.connection.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to brisq this is a test 21 !" });
});

require("./app/routes/companyType.routes")(app);
require("./app/routes/company.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/client.routes")(app);
require("./app/routes/employee.routes")(app);
require("./app/routes/reservation.routes")(app);
require("./app/routes/schedule.routes")(app);
require("./app/routes/serviceEmployee.routes")(app);
require("./app/routes/serviceType.routes")(app);

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

