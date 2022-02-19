import express from 'express';
import bodyparser from 'body-parser';
import cors from 'cors';
import routes from './routes/blogPostRoutes';

const app = express();
const PORT = 3000;

// bodyparser setup
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// CORS setup
app.use(cors());

routes(app);

app.get('/', (req, res) =>
    res.send(`Our Blog Posts application is running on port ${PORT}`)
);

app.listen(PORT, () =>
    console.log(`Our Blog Posts server is running on port ${PORT}`)
)