import axios from 'axios';

const blogPostsAPI = "https://api.hatchways.io/assessment/blog/posts";

export const route1 = (req, res) => {
    res.status(200).json({
        "success": true
    });
};

export const route2 = async (req, res) => {
    let tag = req.query.tag;

    if (tag == null || tag == "") {
        res.status(400).json({
            "error": "Tags parameter is required"
        });
    } else {
        if (tag.indexOf(',') != -1) {
            let multiTags = tag.split(',');
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
                    uniqueData.sort((a, b) => {
                        return a.id - b.id;
                    });
                    Object.keys(uniqueData).forEach(function (key) {
                        console.log(uniqueData[key].id);
                        console.log(uniqueData[key].tags);
                    });
                    res.status(200).json(uniqueData);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            let findOneTag = blogPostsAPI + `?tag=${tag}`;

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