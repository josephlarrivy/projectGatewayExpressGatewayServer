const express = require("express");
const helmet = require("helmet");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const requestLogger = require("./middleware/requestLogger");

app.use(express.json());
app.use(requestLogger);
app.use(helmet());

// Proxy configuration to forward requests to Flask server
app.use('/flask', createProxyMiddleware({
    target: 'http://localhost:5001',
    changeOrigin: true,
    pathRewrite: {
        '^/flask': '', // Remove '/flask' prefix
    },
}));

// Proxy configuration to forward requests to ASP.NET Web API
app.use('/aspnet', createProxyMiddleware({
    target: 'http://localhost:5002', 
    changeOrigin: true,
    pathRewrite: {
        '^/aspnet': '', // Remove '/aspnet' prefix when forwarding
    },
}));


app.get('/test', (req, res) => {
    res.send('Express API Gateway is running');
});

app.listen(3000, function () {
    console.log("API Gateway is listening on port 3000");
});

module.exports = app;