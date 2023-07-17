const { User } = require("../models");
const bcrypt = require("bcryptjs");

const logInController = async (req, res) => {
    try {
        // Query the database for the user with the given name
        const targetUser = await User.findOne({
            where: { name: req.body.name },
        });

        // Check if the user exists in the database
        if (targetUser === null) {
            // If the user isn't found in the database, return an 'incorrect credentials' message
            return res.status(401).json({
                message: "User with the name: " + req.body.name + " does not exist.",
            });
        }

        // If the user is found, we then use bcrypt to check if the password in the request matches the hashed password in the database
        bcrypt.compare(req.body.password, targetUser.password, (err, result) => {
            if (result) {
                // Send a cookie to the client
                req.session.userId = targetUser.id;

                res.status(200).json({
                    message: "Logged in successfully.",
                    user: {
                        name: targetUser.name,
                    },
                });
            } else {
                // Passwords don't match
                res.status(401).json({
                    message: "Wrong password.",
                });
            }
        });
    } catch (err) {
        res.status(500).json({
            message: "Error logging in.",
        });
    }
};

module.exports = logInController;
