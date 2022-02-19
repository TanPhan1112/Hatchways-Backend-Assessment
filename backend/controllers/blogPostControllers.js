import axios from 'axios';

const APIurl = "https://api.hatchways.io/assessment/blog/posts";

export const route1 = (req, res) => {
    res.json({
        "success": true
    });
    res.status(200);
};

export const route2 = async (req, res) => {
    let tag = req.query.tag;
    if (tag == null) {
        res.json({
            "error": "Tags parameter is required"
        });
        res.status(400);
    } else {
        let findTags = APIurl + `?tag=${tag}`;
        axios.get(findTags)
            .then((response) => {
                res.json(response.data);
                res.status(200);
            })
            .catch((error) => {
                console.log(error);
            });
    }
};