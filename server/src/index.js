const express = require("express");
const routes = require("./routes");

require("./database");

var secretKey = "7ece221bf3f5dbddbe3c2770ac19b419";

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3001);
