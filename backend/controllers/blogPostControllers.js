const axios = require('axios');

const blogPostsAPI = "https://api.hatchways.io/assessment/blog/posts";

exports.route1 = (req, res) => {
    setTimeout(() => {
        res.status(200).json({
            "success": true
        });
    }, 2000) //setTimeout was used to simulate a slow processing request
};

exports.route2 = async (req, res) => {
    setTimeout(() => {
        let tags = req.query.tags;
        let sortBy = req.query.sortBy;
        let direction = req.query.direction;

        // Check if `tags` parameter is not present
        if (tags == null || tags == "") {
            res.status(400).json({
                "error": "Tags parameter is required"
            });
        } else {
            // Check if there is a list of tags
            if (tags.indexOf(',') != -1) {
                // A comma separated list of tags
                let multiTags = tags.split(',');
                /* For every tag specified in the tags parameter, fetch the posts with that tag using
                the Hatchways API (make a separate API request for every tag specified) */
                let promiseArray = multiTags.map(eachTag => axios.get(blogPostsAPI + `?tag=${eachTag}`));
                /* Combine all the results from the API requests above and remove all the repeated
                posts */
                axios.all(promiseArray)
                    .then((response) => {
                        let postsArray = [];
                        // Store all the posts from API responses into postsArray
                        for (let i = 0; i < response.length; i++) {
                            let posts = response[i].data.posts;
                            Object.keys(posts).forEach(function (key) {
                                postsArray.push(posts[key]);
                            });
                        }

                        let uniqueData = [];
                        let flag = true;
                        // Remove all the repeated posts and stores all unique posts into uniqueData
                        Object.keys(postsArray).forEach(function (key) {
                            if (uniqueData.length == 0) {
                                uniqueData.push(postsArray[key]);
                            } else {
                                for (let i = 0; i < uniqueData.length; i++) {
                                    // Check if there are same posts in postsArray
                                    if (postsArray[key].id == uniqueData[i].id) {
                                        flag = false;
                                        break;
                                    } else {
                                        flag = true;
                                    }
                                }
                                // Stores all unique posts into uniqueData
                                if (flag) {
                                    uniqueData.push(postsArray[key]);
                                }
                            }
                        });

                        /* The sortBy parameter specifies which field should be used to sort the returned
                        results. This is an optional parameter, with a default value of `id`. */
                        /* The direction parameter specifies if the results should be returned in ascending
                        order (if the value is "asc") or descending order (if the value is "desc"). The default
                        value of the direction parameter is `asc` */
                        // Check if `sortBy` parameter is present, otherwise sort by id in ascending order
                        if (sortBy == "id" || sortBy == "reads" || sortBy == "likes" || sortBy == "popularity" || sortBy == null || sortBy == "") {
                            switch (sortBy) {
                                case "id":
                                    // Check if `direction` parameter is present, otherwise sort in ascending order
                                    if (direction == "asc" || direction == null || direction == "") {
                                        uniqueData.sort((a, b) => {
                                            return a.id - b.id;
                                        });
                                        Object.keys(uniqueData).forEach(function (key) {
                                            console.log(uniqueData[key].id);
                                            console.log(uniqueData[key].tags);
                                        });
                                        res.status(200).json(uniqueData);
                                    } else if (direction == "desc") { // Check if `direction` value is "desc", then sort in descending order
                                        uniqueData.sort((a, b) => {
                                            return b.id - a.id;
                                        });
                                        Object.keys(uniqueData).forEach(function (key) {
                                            console.log(uniqueData[key].id);
                                            console.log(uniqueData[key].tags);
                                        });
                                        res.status(200).json(uniqueData);
                                    } else {
                                        // Check if `direction` parameter is invalid
                                        res.status(400).json({
                                            "error": "direction parameter is invalid"
                                        });
                                    }
                                    break;
                                case "reads":
                                    if (direction == "asc" || direction == null || direction == "") {
                                        uniqueData.sort((a, b) => {
                                            return a.reads - b.reads;
                                        });
                                        Object.keys(uniqueData).forEach(function (key) {
                                            console.log(uniqueData[key].reads);
                                            console.log(uniqueData[key].tags);
                                        });
                                        res.status(200).json(uniqueData);
                                    } else if (direction == "desc") {
                                        uniqueData.sort((a, b) => {
                                            return b.reads - a.reads;
                                        });
                                        Object.keys(uniqueData).forEach(function (key) {
                                            console.log(uniqueData[key].reads);
                                            console.log(uniqueData[key].tags);
                                        });
                                        res.status(200).json(uniqueData);
                                    } else {
                                        res.status(400).json({
                                            "error": "direction parameter is invalid"
                                        });
                                    }
                                    break;
                                case "likes":
                                    if (direction == "asc" || direction == null || direction == "") {
                                        uniqueData.sort((a, b) => {
                                            return a.likes - b.likes;
                                        });
                                        Object.keys(uniqueData).forEach(function (key) {
                                            console.log(uniqueData[key].likes);
                                            console.log(uniqueData[key].tags);
                                        });
                                        res.status(200).json(uniqueData);
                                    } else if (direction == "desc") {
                                        uniqueData.sort((a, b) => {
                                            return b.likes - a.likes;
                                        });
                                        Object.keys(uniqueData).forEach(function (key) {
                                            console.log(uniqueData[key].likes);
                                            console.log(uniqueData[key].tags);
                                        });
                                        res.status(200).json(uniqueData);
                                    } else {
                                        res.status(400).json({
                                            "error": "direction parameter is invalid"
                                        });
                                    }
                                    break;
                                case "popularity":
                                    if (direction == "asc" || direction == null || direction == "") {
                                        uniqueData.sort((a, b) => {
                                            return a.popularity - b.popularity;
                                        });
                                        Object.keys(uniqueData).forEach(function (key) {
                                            console.log(uniqueData[key].popularity);
                                            console.log(uniqueData[key].tags);
                                        });
                                        res.status(200).json(uniqueData);
                                    } else if (direction == "desc") {
                                        uniqueData.sort((a, b) => {
                                            return b.popularity - a.popularity;
                                        });
                                        Object.keys(uniqueData).forEach(function (key) {
                                            console.log(uniqueData[key].popularity);
                                            console.log(uniqueData[key].tags);
                                        });
                                        res.status(200).json(uniqueData);
                                    } else {
                                        res.status(400).json({
                                            "error": "direction parameter is invalid"
                                        });
                                    }
                                    break;
                                default:
                                    if (direction == "desc") {
                                        uniqueData.sort((a, b) => {
                                            return b.id - a.id;
                                        });
                                        Object.keys(uniqueData).forEach(function (key) {
                                            console.log(uniqueData[key].id);
                                            console.log(uniqueData[key].tags);
                                        });
                                        res.status(200).json(uniqueData);
                                        break;
                                    } else {
                                        uniqueData.sort((a, b) => {
                                            return a.id - b.id;
                                        });
                                        Object.keys(uniqueData).forEach(function (key) {
                                            console.log(uniqueData[key].id);
                                            console.log(uniqueData[key].tags);
                                        });
                                        res.status(200).json(uniqueData);
                                        break;
                                    }
                            }
                        } else {
                            // Check if `sortBy` parameter is invalid
                            res.status(400).json({
                                "error": "sortBy parameter is invalid"
                            });
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                // If there is only one tag, fetch only one request 
                let findOneTag = blogPostsAPI + `?tag=${tags}`;

                axios.get(findOneTag)
                    .then((response) => {
                        res.status(200).json(response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
    }, 3000) //setTimeout was used to simulate a slow processing request
};


/* const axios = require('axios');

const blogPostsAPI = "https://api.hatchways.io/assessment/blog/posts";

exports.route1 = (req, res) => {
    res.status(200).json({
        "success": true
    });
};

exports.route2 = async (req, res) => {
    let tags = req.query.tags;
    let sortBy = req.query.sortBy || 'id';
    let direction = req.query.direction || 'asc';

    // Check if `tags` parameter is not present
    if (!tags) {
        return res.status(400).json({
            "error": "Tags parameter is required"
        });
    }

    try {
        let tagArray = tags.split(',');
        let promiseArray = tagArray.map(tag => axios.get(`${blogPostsAPI}?tag=${tag}`));
        let responses = await Promise.all(promiseArray);

        let postsArray = [];
        responses.forEach(response => {
            postsArray = postsArray.concat(response.data.posts);
        });

        // Remove duplicate posts
        let uniquePosts = Array.from(new Set(postsArray.map(post => post.id)))
            .map(id => postsArray.find(post => post.id === id));

        // Sort the posts
        const validSortBy = ['id', 'reads', 'likes', 'popularity'];
        const validDirection = ['asc', 'desc'];

        if (!validSortBy.includes(sortBy)) {
            return res.status(400).json({
                "error": "sortBy parameter is invalid"
            });
        }

        if (!validDirection.includes(direction)) {
            return res.status(400).json({
                "error": "direction parameter is invalid"
            });
        }

        uniquePosts.sort((a, b) => {
            if (direction === 'asc') {
                return a[sortBy] - b[sortBy];
            } else {
                return b[sortBy] - a[sortBy];
            }
        });

        res.status(200).json(uniquePosts);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            "error": "Internal server error"
        });
    }
}; */