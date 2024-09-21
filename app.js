const express = require("express");
require('dotenv').config();
const helmet = require("helmet");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");


const app = express();
const requestLogger = require("./middleware/requestLogger");

app.use(cors({
    origin: process.env.LOCALHOST_ORIGIN
}));

app.use(express.json());
app.use(requestLogger);
app.use(helmet());



// Proxy configuration to forward requests to Flask server
app.use('/data', createProxyMiddleware({
    target: process.env.FLASK_SERVER_TARGET,
    changeOrigin: true,
    pathRewrite: {
        '^/data': '',
    },
}));

// Proxy configuration to forward requests to ASP.NET Web API
app.use('/auth', createProxyMiddleware({
    target: process.env.DOTNET_SERVER_TARGET, 
    changeOrigin: true,
    pathRewrite: {
        '^/auth': '', 
    },
}));


app.get('/test', (req, res) => {
    res.send('Express API gateway is running');
});

app.listen(3000, function () {
    console.log("API gateway is listening on port 3000");
});

module.exports = app;