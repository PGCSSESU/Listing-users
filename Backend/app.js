const express = require("express");
const cors = require("cors");
const usersRoutes = require("./routes/user.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(usersRoutes);

module.exports = app;
