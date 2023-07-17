const { Comment } = require("../models");

const getCommentsController = async (req, res) => {
    const postId = parseInt(req.params.postId, 10);

    try {
        // SELECT * FROM comments WHERE PostId = postId;
        const allComments = await Comment.findAll({
            where: { PostId: postId },
        });

        if (allComments) {
            res.status(200).json(allComments);
        } else {
            res.status(404).json({ message: "No comments found." });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
    }
};

module.exports = getCommentsController;
