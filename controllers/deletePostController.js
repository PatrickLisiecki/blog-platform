const { Post } = require("../models");

const deletePostController = async (req, res) => {
    const targetId = parseInt(req.params.postId, 10);

    try {
        const deleteSuccess = await Post.destroy({
            where: { id: targetId },
        });

        if (deleteSuccess > 0) {
            res.status(200).send({
                message: `Post #${targetId} deleted successfully.`,
            });
        } else {
            res.status(404).send({
                message: `Post #${targetId} not found.`,
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
    }
};

module.exports = deletePostController;
