const { Comment } = require("../models");

const createCommentController = async (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    const commentContent = req.body.content;

    try {
        const newComment = await Comment.create({
            content: commentContent,
            UserId: req.session.userId,
            PostId: postId,
        });

        res.status(201).json(newComment);
    } catch (err) {
        if (err.name === "SequelizeValidationError") {
            return res.status(422).json({ errors: err.errors.map((e) => e.message) });
        }
        console.error(err);
        res.status(500).send({ message: err.message });
    }
};

module.exports = createCommentController;
