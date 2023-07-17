const { Post } = require("../models");

const createPostController = async (req, res) => {
    const postTitle = req.body.title;
    const postContent = req.body.content;

    try {
        const newPost = await Post.create({
            title: postTitle,
            content: postContent,
            UserId: req.session.userId,
        });

        res.status(201).json(newPost);
    } catch (err) {
        if (err.name === "SequelizeValidationError") {
            return res.status(422).json({ errors: err.errors.map((e) => e.message) });
        }
        console.error(err);
        res.status(500).send({ message: err.message });
    }
};

module.exports = createPostController;
