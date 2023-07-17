const { Post } = require("../models");

const getPostsController = async (req, res) => {
    try {
        // SELECT * FROM posts;
        const allPosts = await Post.findAll();

        if (allPosts) {
            res.status(200).json(allPosts);
        } else {
            res.status(404).json({ message: "No posts found." });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
    }
};

module.exports = getPostsController;
