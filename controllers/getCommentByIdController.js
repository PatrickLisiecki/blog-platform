const { Comment } = require("../models");

const getCommentByIdController = async (req, res) => {
    const targetPostId = parseInt(req.params.postId, 10);
    const targetCommentId = parseInt(req.params.commentId, 10);

    try {
        const targetComment = await Comment.findOne({
            where: { id: targetCommentId, PostId: targetPostId },
        });

        if (targetComment) {
            res.status(200).json(targetComment);
        } else {
            res.status(404).json({ message: "No comment found." });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
    }
};

module.exports = getCommentByIdController;
