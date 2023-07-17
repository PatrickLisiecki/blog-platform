const { Post } = require("../models");

const updatePostController = async (req, res) => {
    const targetId = parseInt(req.params.postId, 10);

    try {
        const [numberOfAffectedRows, affectedRows] = await Post.update(req.body, {
            where: { id: targetId },
            returning: true,
        });

        if (numberOfAffectedRows > 0) {
            res.status(200).json(affectedRows[0]);
        } else {
            res.status(404).send({ message: `Post #${targetId} not found.` });
        }
    } catch (err) {
        if (err.name === "SequelizeValidationError") {
            return res.status(422).json({ errors: err.errors.map((e) => e.message) });
        }
        console.error(err);
        res.status(500).send({ message: err.message });
    }
};

module.exports = updatePostController;
