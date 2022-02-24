const request = require("supertest");
const app = require("../app");

describe("Test the root path", () => {
    test("It should response the GET method", () => {
        return request(app)
            .get("/")
            .expect(200);
    });
});

describe("Test the route 1", () => {
    test("It should response the GET method", () => {
        return request(app)
            .get("/api/ping")
            .expect("Content-Type", /json/)
            .expect({ "success": true })
            .expect(200);
    });
});

describe("Test the route 2 without query parameters", () => {
    test("It should response an error", () => {
        return request(app)
            .get("/api/posts")
            .expect("Content-Type", /json/)
            .expect({ "error": "Tags parameter is required" })
            .expect(400);
    });
});

describe("Test the route 2 with an empty tag parameters", () => {
    test("It should response an error", () => {
        return request(app)
            .get("/api/posts?tags=")
            .expect("Content-Type", /json/)
            .expect({ "error": "Tags parameter is required" })
            .expect(400);
    });
});

describe("Test the route 2 with tag parameter", () => {
    test("It should return an array object of items with a specific tag (tech) in ascending default order by id", () => {
        return request(app)
            .get("/api/posts?tags=tech")
            .expect(200)
            .expect("Content-Type", /json/)
            .expect((res) => {
                for (let i = 0; i < res.body.posts.length; i++) {
                    console.log(res.body.posts[i].tags);
                    if (res.body.posts[i].tags.indexOf('tech') == -1) {
                        throw new Error(res.body.posts[i] + "missing required tag(s) = tech!!!");
                    }
                }
                for (let i = 0; i < res.body.posts.length - 1; i++) {
                    console.log(res.body.posts[i].id);
                    if (res.body.posts[i].id > res.body.posts[i + 1].id) {
                        throw new Error("Results are not returned in ascending default order by id!!!");
                    }
                    if (res.body.posts[i].id == res.body.posts[i + 1].id) {
                        throw new Error("Results are duplicated by id!!!");
                    }
                }
            })
    });

    test("It should return an array object of items with a specific tag (history) in ascending default order by id", () => {
        return request(app)
            .get("/api/posts?tags=history")
            .expect(200)
            .expect("Content-Type", /json/)
            .expect((res) => {
                for (let i = 0; i < res.body.posts.length; i++) {
                    console.log(res.body.posts[i].tags);
                    if (res.body.posts[i].tags.indexOf('history') == -1) {
                        throw new Error(res.body.posts[i] + "missing required tag(s) = history!!!");
                    }
                }
                for (let i = 0; i < res.body.posts.length - 1; i++) {
                    console.log(res.body.posts[i].id);
                    if (res.body.posts[i].id > res.body.posts[i + 1].id) {
                        throw new Error("Results are not returned in ascending default order by id!!!");
                    }
                    if (res.body.posts[i].id == res.body.posts[i + 1].id) {
                        throw new Error("Results are duplicated by id!!!");
                    }
                }
            })
    });
});

describe("Test the route 2 with tag parameter", () => {
    test("It should return an array object of items with specific tags (tech,health) in ascending default order by id", () => {
        return request(app)
            .get("/api/posts?tags=tech,health")
            .expect(200)
            .expect("Content-Type", /json/)
            .expect((res) => {
                for (let i = 0; i < res.body.length; i++) {
                    console.log(res.body[i].tags);
                    if (res.body[i].tags.indexOf('tech') == -1 && res.body[i].tags.indexOf('health') == -1) {
                        throw new Error(res.body[i] + "missing required tag(s) = tech or health!!!");
                    }
                }
                for (let i = 0; i < res.body.length - 1; i++) {
                    console.log(res.body[i].id);
                    if (res.body[i].id > res.body[i + 1].id) {
                        throw new Error("Results are not returned in ascending default order by id!!!");
                    }
                    if (res.body[i].id == res.body[i + 1].id) {
                        throw new Error("Results are duplicated by id!!!");
                    }
                }
            })
    });

    test("It should return an array object of items with specific tags (history,health) in ascending default order by id", () => {
        return request(app)
            .get("/api/posts?tags=history,health")
            .expect(200)
            .expect("Content-Type", /json/)
            .expect((res) => {
                for (let i = 0; i < res.body.length; i++) {
                    console.log(res.body[i].tags);
                    if (res.body[i].tags.indexOf('history') == -1 && res.body[i].tags.indexOf('health') == -1) {
                        throw new Error(res.body[i] + "missing required tag(s) = history or health!!!");
                    }
                }
                for (let i = 0; i < res.body.length - 1; i++) {
                    console.log(res.body[i].id);
                    if (res.body[i].id > res.body[i + 1].id) {
                        throw new Error("Results are not returned in ascending default order by id!!!");
                    }
                    if (res.body[i].id == res.body[i + 1].id) {
                        throw new Error("Results are duplicated by id!!!");
                    }
                }
            })
    });

    test("It should return an array object of items with specific tags (tech,health) in descending default order by id", () => {
        return request(app)
            .get("/api/posts?tags=tech,health&direction=desc")
            .expect(200)
            .expect("Content-Type", /json/)
            .expect((res) => {
                for (let i = 0; i < res.body.length; i++) {
                    console.log(res.body[i].tags);
                    if (res.body[i].tags.indexOf('tech') == -1 && res.body[i].tags.indexOf('health') == -1) {
                        throw new Error(res.body[i] + "missing required tag(s) = tech or health!!!");
                    }
                }
                for (let i = 0; i < res.body.length - 1; i++) {
                    console.log(res.body[i].id);
                    if (res.body[i].id < res.body[i + 1].id) {
                        throw new Error("Results are not returned in descending default order by id!!!");
                    }
                    if (res.body[i].id == res.body[i + 1].id) {
                        throw new Error("Results are duplicated by id!!!");
                    }
                }
            })
    });

    test("It should return an array object of items with specific tags (history,health) in descending default order by id", () => {
        return request(app)
            .get("/api/posts?tags=history,health&direction=desc")
            .expect(200)
            .expect("Content-Type", /json/)
            .expect((res) => {
                for (let i = 0; i < res.body.length; i++) {
                    console.log(res.body[i].tags);
                    if (res.body[i].tags.indexOf('history') == -1 && res.body[i].tags.indexOf('health') == -1) {
                        throw new Error(res.body[i] + "missing required tag(s) = history or health!!!");
                    }
                }
                for (let i = 0; i < res.body.length - 1; i++) {
                    console.log(res.body[i].id);
                    if (res.body[i].id < res.body[i + 1].id) {
                        throw new Error("Results are not returned in descending default order by id!!!");
                    }
                    if (res.body[i].id == res.body[i + 1].id) {
                        throw new Error("Results are duplicated by id!!!");
                    }
                }
            })
    });
});

describe("Test the route 2 with tag & sortBy parameters", () => {
    test("It should response an error", () => {
        return request(app)
            .get("/api/posts?tags=tech,health&sortBy=123")
            .expect(400)
            .expect("Content-Type", /json/)
            .expect({ "error": "sortBy parameter is invalid" })
    });

    test("It should return an array object of items with specific tags (tech,health) in ascending order by id", () => {
        return request(app)
            .get("/api/posts?tags=tech,health&sortBy=id")
            .expect(200)
            .expect("Content-Type", /json/)
            .expect((res) => {
                for (let i = 0; i < res.body.length; i++) {
                    console.log(res.body[i].tags);
                    if (res.body[i].tags.indexOf('tech') == -1 && res.body[i].tags.indexOf('health') == -1) {
                        throw new Error(res.body[i] + "missing required tag(s) = tech or health!!!");
                    }
                }
                for (let i = 0; i < res.body.length - 1; i++) {
                    console.log(res.body[i].id);
                    if (res.body[i].id > res.body[i + 1].id) {
                        throw new Error("Results are not returned in ascending order by id!!!");
                    }
                    if (res.body[i].id == res.body[i + 1].id) {
                        throw new Error("Results are duplicated by id!!!");
                    }
                }
            })
    });

    test("It should return an array object of items with specific tags (tech,health) in ascending order by reads", () => {
        return request(app)
            .get("/api/posts?tags=tech,health&sortBy=reads")
            .expect(200)
            .expect("Content-Type", /json/)
            .expect((res) => {
                for (let i = 0; i < res.body.length; i++) {
                    console.log(res.body[i].tags);
                    if (res.body[i].tags.indexOf('tech') == -1 && res.body[i].tags.indexOf('health') == -1) {
                        throw new Error(res.body[i] + "missing required tag(s) = tech or health!!!");
                    }
                }
                for (let i = 0; i < res.body.length - 1; i++) {
                    console.log(res.body[i].reads);
                    if (res.body[i].reads > res.body[i + 1].reads) {
                        throw new Error("Results are not returned in ascending order by reads!!!");
                    }
                    if (res.body[i].id == res.body[i + 1].id) {
                        throw new Error("Results are duplicated by id!!!");
                    }
                }
            })
    });

    test("It should return an array object of items with specific tags (tech,health) in ascending order by likes", () => {
        return request(app)
            .get("/api/posts?tags=tech,health&sortBy=likes")
            .expect(200)
            .expect("Content-Type", /json/)
            .expect((res) => {
                for (let i = 0; i < res.body.length; i++) {
                    console.log(res.body[i].tags);
                    if (res.body[i].tags.indexOf('tech') == -1 && res.body[i].tags.indexOf('health') == -1) {
                        throw new Error(res.body[i] + "missing required tag(s) = tech or health!!!");
                    }
                }
                for (let i = 0; i < res.body.length - 1; i++) {
                    console.log(res.body[i].likes);
                    if (res.body[i].likes > res.body[i + 1].likes) {
                        throw new Error("Results are not returned in ascending order by likes!!!");
                    }
                    if (res.body[i].id == res.body[i + 1].id) {
                        throw new Error("Results are duplicated by id!!!");
                    }
                }
            })
    });

    test("It should return an array object of items with specific tags (tech,health) in ascending order by popularity", () => {
        return request(app)
            .get("/api/posts?tags=tech,health&sortBy=popularity")
            .expect(200)
            .expect("Content-Type", /json/)
            .expect((res) => {
                for (let i = 0; i < res.body.length; i++) {
                    console.log(res.body[i].tags);
                    if (res.body[i].tags.indexOf('tech') == -1 && res.body[i].tags.indexOf('health') == -1) {
                        throw new Error(res.body[i] + "missing required tag(s) = tech or health!!!");
                    }
                }
                for (let i = 0; i < res.body.length - 1; i++) {
                    console.log(res.body[i].popularity);
                    if (res.body[i].popularity > res.body[i + 1].popularity) {
                        throw new Error("Results are not returned in ascending order by popularity!!!");
                    }
                    if (res.body[i].id == res.body[i + 1].id) {
                        throw new Error("Results are duplicated by id!!!");
                    }
                }
            })
    });
});

describe("Test the route 2 with tag, sortBy & direction parameters", () => {
    test("It should response an error", () => {
        return request(app)
            .get("/api/posts?tags=tech,health&sortBy=id&direction=123")
            .expect(400)
            .expect("Content-Type", /json/)
            .expect({ "error": "direction parameter is invalid" })
    });

    test("It should return an array object of items with specific tags (tech,health) in ascending order by id", () => {
        return request(app)
            .get("/api/posts?tags=tech,health&sortBy=id&direction=asc")
            .expect(200)
            .expect("Content-Type", /json/)
            .expect((res) => {
                for (let i = 0; i < res.body.length; i++) {
                    console.log(res.body[i].tags);
                    if (res.body[i].tags.indexOf('tech') == -1 && res.body[i].tags.indexOf('health') == -1) {
                        throw new Error(res.body[i] + "missing required tag(s) = tech or health!!!");
                    }
                }
                for (let i = 0; i < res.body.length - 1; i++) {
                    console.log(res.body[i].id);
                    if (res.body[i].id > res.body[i + 1].id) {
                        throw new Error("Results are not returned in ascending order by id!!!");
                    }
                    if (res.body[i].id == res.body[i + 1].id) {
                        throw new Error("Results are duplicated by id!!!");
                    }
                }
            })
    });

    test("It should return an array object of items with specific tags (tech,health) in ascending order by reads", () => {
        return request(app)
            .get("/api/posts?tags=tech,health&sortBy=reads&direction=asc")
            .expect(200)
            .expect("Content-Type", /json/)
            .expect((res) => {
                for (let i = 0; i < res.body.length; i++) {
                    console.log(res.body[i].tags);
                    if (res.body[i].tags.indexOf('tech') == -1 && res.body[i].tags.indexOf('health') == -1) {
                        throw new Error(res.body[i] + "missing required tag(s) = tech or health!!!");
                    }
                }
                for (let i = 0; i < res.body.length - 1; i++) {
                    console.log(res.body[i].reads);
                    if (res.body[i].reads > res.body[i + 1].reads) {
                        throw new Error("Results are not returned in ascending order by reads!!!");
                    }
                    if (res.body[i].id == res.body[i + 1].id) {
                        throw new Error("Results are duplicated by id!!!");
                    }
                }
            })
    });

    test("It should return an array object of items with specific tags (tech,health) in ascending order by likes", () => {
        return request(app)
            .get("/api/posts?tags=tech,health&sortBy=likes&direction=asc")
            .expect(200)
            .expect("Content-Type", /json/)
            .expect((res) => {
                for (let i = 0; i < res.body.length; i++) {
                    console.log(res.body[i].tags);
                    if (res.body[i].tags.indexOf('tech') == -1 && res.body[i].tags.indexOf('health') == -1) {
                        throw new Error(res.body[i] + "missing required tag(s) = tech or health!!!");
                    }
                }
                for (let i = 0; i < res.body.length - 1; i++) {
                    console.log(res.body[i].likes);
                    if (res.body[i].likes > res.body[i + 1].likes) {
                        throw new Error("Results are not returned in ascending order by likes!!!");
                    }
                    if (res.body[i].id == res.body[i + 1].id) {
                        throw new Error("Results are duplicated by id!!!");
                    }
                }
            })
    });

    test("It should return an array object of items with specific tags (tech,health) in ascending order by popularity", () => {
        return request(app)
            .get("/api/posts?tags=tech,health&sortBy=popularity&direction=asc")
            .expect(200)
            .expect("Content-Type", /json/)
            .expect((res) => {
                for (let i = 0; i < res.body.length; i++) {
                    console.log(res.body[i].tags);
                    if (res.body[i].tags.indexOf('tech') == -1 && res.body[i].tags.indexOf('health') == -1) {
                        throw new Error(res.body[i] + "missing required tag(s) = tech or health!!!");
                    }
                }
                for (let i = 0; i < res.body.length - 1; i++) {
                    console.log(res.body[i].popularity);
                    if (res.body[i].popularity > res.body[i + 1].popularity) {
                        throw new Error("Results are not returned in ascending order by popularity!!!");
                    }
                    if (res.body[i].id == res.body[i + 1].id) {
                        throw new Error("Results are duplicated by id!!!");
                    }
                }
            })
    });

    test("It should return an array object of items with specific tags (tech,health) in descending order by id", () => {
        return request(app)
            .get("/api/posts?tags=tech,health&sortBy=id&direction=desc")
            .expect(200)
            .expect("Content-Type", /json/)
            .expect((res) => {
                for (let i = 0; i < res.body.length; i++) {
                    console.log(res.body[i].tags);
                    if (res.body[i].tags.indexOf('tech') == -1 && res.body[i].tags.indexOf('health') == -1) {
                        throw new Error(res.body[i] + "missing required tag(s) = tech or health!!!");
                    }
                }
                for (let i = 0; i < res.body.length - 1; i++) {
                    console.log(res.body[i].id);
                    if (res.body[i].id < res.body[i + 1].id) {
                        throw new Error("Results are not returned in descending order by id!!!");
                    }
                    if (res.body[i].id == res.body[i + 1].id) {
                        throw new Error("Results are duplicated by id!!!");
                    }
                }
            })
    });

    test("It should return an array object of items with specific tags (tech,health) in descending order by reads", () => {
        return request(app)
            .get("/api/posts?tags=tech,health&sortBy=reads&direction=desc")
            .expect(200)
            .expect("Content-Type", /json/)
            .expect((res) => {
                for (let i = 0; i < res.body.length; i++) {
                    console.log(res.body[i].tags);
                    if (res.body[i].tags.indexOf('tech') == -1 && res.body[i].tags.indexOf('health') == -1) {
                        throw new Error(res.body[i] + "missing required tag(s) = tech or health!!!");
                    }
                }
                for (let i = 0; i < res.body.length - 1; i++) {
                    console.log(res.body[i].reads);
                    if (res.body[i].reads < res.body[i + 1].reads) {
                        throw new Error("Results are not returned in descending order by reads!!!");
                    }
                    if (res.body[i].id == res.body[i + 1].id) {
                        throw new Error("Results are duplicated by id!!!");
                    }
                }
            })
    });

    test("It should return an array object of items with specific tags (tech,health) in descending order by likes", () => {
        return request(app)
            .get("/api/posts?tags=tech,health&sortBy=likes&direction=desc")
            .expect(200)
            .expect("Content-Type", /json/)
            .expect((res) => {
                for (let i = 0; i < res.body.length; i++) {
                    console.log(res.body[i].tags);
                    if (res.body[i].tags.indexOf('tech') == -1 && res.body[i].tags.indexOf('health') == -1) {
                        throw new Error(res.body[i] + "missing required tag(s) = tech or health!!!");
                    }
                }
                for (let i = 0; i < res.body.length - 1; i++) {
                    console.log(res.body[i].likes);
                    if (res.body[i].likes < res.body[i + 1].likes) {
                        throw new Error("Results are not returned in descending order by likes!!!");
                    }
                    if (res.body[i].id == res.body[i + 1].id) {
                        throw new Error("Results are duplicated by id!!!");
                    }
                }
            })
    });

    test("It should return an array object of items with specific tags (tech,history) in descending order by likes", () => {
        return request(app)
            .get("/api/posts?tags=tech,history&sortBy=likes&direction=desc")
            .expect(200)
            .expect("Content-Type", /json/)
            .expect((res) => {
                for (let i = 0; i < res.body.length; i++) {
                    console.log(res.body[i].tags);
                    if (res.body[i].tags.indexOf('tech') == -1 && res.body[i].tags.indexOf('history') == -1) {
                        throw new Error(res.body[i] + "missing required tag(s) = tech or history!!!");
                    }
                }
                for (let i = 0; i < res.body.length - 1; i++) {
                    console.log(res.body[i].likes);
                    if (res.body[i].likes < res.body[i + 1].likes) {
                        throw new Error("Results are not returned in descending order by likes!!!");
                    }
                    if (res.body[i].id == res.body[i + 1].id) {
                        throw new Error("Results are duplicated by id!!!");
                    }
                }
            })
    });

    test("It should return an array object of items with specific tags (tech,health) in descending order by popularity", () => {
        return request(app)
            .get("/api/posts?tags=tech,health&sortBy=popularity&direction=desc")
            .expect(200)
            .expect("Content-Type", /json/)
            .expect((res) => {
                for (let i = 0; i < res.body.length; i++) {
                    console.log(res.body[i].tags);
                    if (res.body[i].tags.indexOf('tech') == -1 && res.body[i].tags.indexOf('health') == -1) {
                        throw new Error(res.body[i] + "missing required tag(s) = tech or health!!!");
                    }
                }
                for (let i = 0; i < res.body.length - 1; i++) {
                    console.log(res.body[i].popularity);
                    if (res.body[i].popularity < res.body[i + 1].popularity) {
                        throw new Error("Results are not returned in descending order by popularity!!!");
                    }
                    if (res.body[i].id == res.body[i + 1].id) {
                        throw new Error("Results are duplicated by id!!!");
                    }
                }
            })
    });
});