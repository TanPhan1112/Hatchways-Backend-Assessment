const express = require("express");
const routes = require('./routes/blogPostRoutes');
var mcache = require('memory-cache');

const app = express();
const PORT = 3000;

routes(app);

// Implement a server side cache to routes
var cache = (duration) => {
    return (req, res, next) => {
        let key = '__express__' + req.originalUrl || req.url
        let cachedBody = mcache.get(key)
        if (cachedBody) {
            res.send(cachedBody)
            return
        } else {
            res.sendResponse = res.send
            res.send = (body) => {
                mcache.put(key, body, duration * 1000);
                res.sendResponse(body)
            }
            next()
        }
    }
}

app.get('/', cache(10), (req, res) =>
    setTimeout(() => {
        res.status(200).send(`Blog Posts application is running on port ${PORT}`)
    }, 1000) //setTimeout was used to simulate a slow processing request
);

module.exports = app;