const { Comment } = require("../models");

const updateCommentController = async (req, res) => {
    const targetPostId = parseInt(req.params.postId, 10);
    const targetCommentId = parseInt(req.params.commentId, 10);

    try {
        const [numberOfAffectedRows, affectedRows] = await Comment.update(req.body, {
            where: { id: targetCommentId, PostId: targetPostId },
            returning: true,
        });

        if (numberOfAffectedRows > 0) {
            res.status(200).json(affectedRows[0]);
        } else {
            res.status(404).send({ message: `Comment #${targetCommentId} not found.` });
        }
    } catch (err) {
        if (err.name === "SequelizeValidationError") {
            return res.status(422).json({ errors: err.errors.map((e) => e.message) });
        }
        console.error(err);
        res.status(500).send({ message: err.message });
    }
};

module.exports = updateCommentController;
