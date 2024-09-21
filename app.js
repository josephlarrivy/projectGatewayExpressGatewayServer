const express = require("express");
require('dotenv').config();
const helmet = require("helmet");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const requestLogger = require("./middleware/requestLogger");

app.use(express.json());
app.use(requestLogger);
app.use(helmet());


// Proxy configuration to forward requests to Flask server
app.use('/data', createProxyMiddleware({
    target: process.env.FLASK_SERVER_TARGET,
    changeOrigin: true,
    pathRewrite: {
        '^/data': '', // Remove '/flask' prefix
    },
}));

// Proxy configuration to forward requests to ASP.NET Web API
app.use('/auth', createProxyMiddleware({
    target: process.env.DOTNET_SERVER_TARGET, 
    changeOrigin: true,
    pathRewrite: {
        '^/auth': '', // Remove '/aspnet' prefix when forwarding
    },
}));


app.get('/test', (req, res) => {
    res.send('Express API gateway is running');
});

app.listen(3000, function () {
    console.log("API gateway is listening on port 3000");
});

module.exports = app;