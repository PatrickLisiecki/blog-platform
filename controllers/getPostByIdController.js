const { Post } = require("../models");

const getPostByIdController = async (req, res) => {
    const targetId = parseInt(req.params.postId, 10);
    
    try {
        // SELECT * FROM posts WHERE id = targetId;
        const targetPost = await Post.findOne({ where: { id: targetId } });

        if (targetPost) {
            res.status(200).json(targetPost);
        } else {
            res.status(404).json({ message: "No post found." });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
    }
};

module.exports = getPostByIdController;
