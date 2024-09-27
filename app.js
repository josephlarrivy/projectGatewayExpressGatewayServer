const express = require("express");
require('dotenv').config();
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");
const requestLogger = require("./middleware/requestLogger");

const app = express();
app.use(requestLogger);

app.use(cors({
    origin: process.env.CLIENT_ORIGIN
}));

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const routes = [
    {
        context: "/data",
        target: process.env.FLASK_SERVER_TARGET,
        secure: true,
        auth: false,
        changeOrigin: true,
        pathRewrite: { "^/data": "" },
        methods: ["GET", "POST", "PUT"],
    },
    {
        context: "/auth",
        target: process.env.DOTNET_SERVER_TARGET,
        secure: true,
        auth: false,
        changeOrigin: true,
        pathRewrite: { "^/auth": "" },
        methods: ["GET", "POST", "PUT"],
    }
];

routes.forEach((route) => {
    app.use(
        route.context,
        createProxyMiddleware({
            target: route.target,
            pathRewrite: route.pathRewrite,
            changeOrigin: route.changeOrigin,
            secure: route.secure,
            onProxyReq: (proxyReq, req) => {
                if (route.methods.includes(req.method)) {
                    // Modify headers or perform other actions before sending the request
                }
            },
        })
    );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Gateway server is running on port ${PORT}`);
});






// const express = require("express");
// require('dotenv').config();
// const helmet = require("helmet");
// const cors = require("cors");
// const { createProxyMiddleware } = require("http-proxy-middleware");

// const app = express();
// const requestLogger = require("./middleware/requestLogger");

// // Middleware setup
// app.use(cors({
//     origin: process.env.CLIENT_ORIGIN
// }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(requestLogger);
// app.use(helmet());

// const proxy = createProxyMiddleware({
//     onProxyReq: fixRequestBody
// });

// // Proxy configuration to forward requests to Flask server
// app.use('/data', createProxyMiddleware({
//     target: process.env.FLASK_SERVER_TARGET,
//     changeOrigin: true,
//     pathRewrite: {
//         '^/data': '',
//     },
//     onProxyReq: fixRequestBody
// }));

// // Proxy configuration to forward requests to .NET server
// app.use('/auth', createProxyMiddleware({
//     target: process.env.DOTNET_SERVER_TARGET,
//     changeOrigin: true,
//     pathRewrite: {
//         '^/auth': '',
//     },
//     onProxyReq: fixRequestBody
// }));

// app.get('/test', (req, res) => {
//     res.send('Express API gateway is running');
// });

// // Start the server
// app.listen(3000, function () {
//     console.log("API gateway is listening on port 3000");
// });

// module.exports = app;
