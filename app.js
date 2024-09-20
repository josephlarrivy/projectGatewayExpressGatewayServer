const express = require("express");
const app = express();
const testRoutes = require("./routes/testRoutes");
const requestLogger = require("./middleware/requestLogger");

app.use(express.json());
app.use(requestLogger);


app.use(testRoutes);

app.listen(3000, function () {
    console.log("Server is listening on port 3000");
});

module.exports = app;
