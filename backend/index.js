const bodyparser = require('body-parser');
const app = require("./app");

// bodyparser setup
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.listen(3000, () =>
    console.log(`Blog Posts server is running on port 3000!`)
);