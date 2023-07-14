const { Post } = require("../models");

const getPostsController = async (req, res) => {
    try {
        // Query the database for the user with the given name
        const userPosts = await Post.findAll();

        if (userPosts) {
            res.status(200).json(userPosts);
        } else {
            res.status(404).json({ message: "No posts found." });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
    }
};

module.exports = getPostsController;
