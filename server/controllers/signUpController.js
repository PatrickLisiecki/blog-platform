const { User } = require("../models");
const bcrypt = require("bcryptjs");

const signUpController = async (req, res) => {
    // Hash the password from the request
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    try {
        // Create a new user with the hashed password
        const newUser = await User.create({
            name: req.body.name,
            password: hashedPassword,
        });

        // Send a cookie to the client
        req.session.userId = newUser.id;

        res.status(201).json({
            message: "User created successfully",
            name: newUser.name,
        });
    } catch (err) {
        if (err.name === "SequelizeValidationError") {
            return res.status(422).json({ errors: err.errors.map((e) => e.message) });
        }
        res.status(500).json({
            message: "Error occurred while creating user!",
            error: err,
        });
    }
};

module.exports = signUpController;
