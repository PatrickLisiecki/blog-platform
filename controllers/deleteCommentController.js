const { Comment } = require("../models");

const deleteCommentController = async (req, res) => {
    const targetPostId = parseInt(req.params.postId, 10);
    const targetCommentId = parseInt(req.params.commentId, 10);

    try {
        const deleteSuccess = await Comment.destroy({
            where: { id: targetCommentId, PostId: targetPostId },
        });

        if (deleteSuccess > 0) {
            res.status(200).send({
                message: `Comment #${targetCommentId} deleted successfully.`,
            });
        } else {
            res.status(404).send({
                message: `Comment #${targetCommentId} not found.`,
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
    }
};

module.exports = deleteCommentController;
