const { route1, route2 } = require("../controllers/blogPostControllers");
var mcache = require("memory-cache");

// Implement a server side cache to routes
var cache = (duration) => {
  return (req, res, next) => {
    let key = "__express__" + req.originalUrl || req.url;
    let cachedBody = mcache.get(key);
    if (cachedBody) {
      res.send(cachedBody);
      return;
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body);
      };
      next();
    }
  };
};

const routes = (app) => {
  app
    .route("/api/ping")
    // GET route 1
    .get(route1, cache(10));

  app
    .route("/api/posts")
    // GET route 2
    .get(route2, cache(10));
};

module.exports = routes;

// const { route1, route2 } = require('../controllers/blogPostControllers');
// const mcache = require('memory-cache');

// // Implement a server side cache to routes
// const cache = (duration) => {
//     return (req, res, next) => {
//         let key = '__express__' + (req.originalUrl || req.url);
//         let cachedBody = mcache.get(key);
//         if (cachedBody) {
//             res.send(cachedBody);
//             return;
//         } else {
//             res.sendResponse = res.send;
//             res.send = (body) => {
//                 mcache.put(key, body, duration * 1000);
//                 res.sendResponse(body);
//             };
//             next();
//         }
//     };
// };

// const routes = (app) => {
//     app.route('/api/ping')
//         // Apply cache middleware before route handler
//         .get(cache(10), route1);

//     app.route('/api/posts')
//         // Apply cache middleware before route handler
//         .get(cache(10), route2);
// };

// module.exports = routes;
