import axios from 'axios';

const blogPostsAPI = "https://api.hatchways.io/assessment/blog/posts";

export const route1 = (req, res) => {
    res.status(200).json({
        "success": true
    });
};

export const route2 = async (req, res) => {
    let tags = req.query.tags;
    let sortBy = req.query.sortBy;
    let direction = req.query.direction;

    if (tags == null || tags == "") {
        res.status(400).json({
            "error": "Tags parameter is required"
        });
    } else {
        if (tags.indexOf(',') != -1) {
            let multiTags = tags.split(',');
            let promiseArray = multiTags.map(eachTag => axios.get(blogPostsAPI + `?tag=${eachTag}`));

            axios.all(promiseArray)
                .then((response) => {
                    let postsArray = [];

                    for (let i = 0; i < response.length; i++) {
                        let posts = response[i].data.posts;
                        Object.keys(posts).forEach(function (key) {
                            postsArray.push(posts[key]);
                        });
                    }

                    let uniqueData = [];
                    let flag = true;

                    Object.keys(postsArray).forEach(function (key) {
                        if (uniqueData.length == 0) {
                            uniqueData.push(postsArray[key]);
                        } else {
                            for (let i = 0; i < uniqueData.length; i++) {
                                if (postsArray[key].id == uniqueData[i].id) {
                                    flag = false;
                                    break;
                                } else {
                                    flag = true;
                                }
                            }
                            if (flag) {
                                uniqueData.push(postsArray[key]);
                            }
                        }
                    });

                    if (sortBy == "id" || sortBy == "reads" || sortBy == "likes" || sortBy == "popularity" || sortBy == null || sortBy == "") {
                        switch (sortBy) {
                            case "id":
                                uniqueData.sort((a, b) => {
                                    return a.id - b.id;
                                });
                                break;
                            case "reads":
                                uniqueData.sort((a, b) => {
                                    return a.reads - b.reads;
                                });
                                break;
                            case "likes":
                                uniqueData.sort((a, b) => {
                                    return a.likes - b.likes;
                                });
                                break;
                            case "popularity":
                                uniqueData.sort((a, b) => {
                                    return a.popularity - b.popularity;
                                });
                                break;
                            default:
                                uniqueData.sort((a, b) => {
                                    return a.id - b.id;
                                });
                                break;
                        }
                    } else {
                        res.status(400).json({
                            "error": "sortBy parameter is invalid"
                        });
                    }

                    Object.keys(uniqueData).forEach(function (key) {
                        console.log(uniqueData[key].id);
                        console.log(uniqueData[key].popularity);
                        console.log(uniqueData[key].tags);
                    });
                    res.status(200).json(uniqueData);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
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
};