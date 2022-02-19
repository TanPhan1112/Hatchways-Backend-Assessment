import { route1, route2 } from '../controllers/blogPostControllers';

const routes = (app) => {
    app.route('/api/ping')
        // GET route 1
        .get(route1)

    app.route('/api/posts')
        // GET route 2
        .get(route2)
}

export default routes;