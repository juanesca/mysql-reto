const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

require('dotenv').config();

//Initializations
const app = express();

//Settings
app.set("port", process.env.PORT);

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

//Routes
app.use("/vehiculos", require("./routes/vehiculos"));
app.use('/linea', require('./routes/t_linea'));
app.use('/marca', require('./routes/t_marca'));

//Starting the server
app.listen(app.get("port"), () => {
  console.log(`Server running on port: ${app.get("port")}`);
});
