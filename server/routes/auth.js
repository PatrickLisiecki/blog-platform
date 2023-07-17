const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User } = require("../models");

router.get("/current_user", async (req, res) => {
    if (req.session.userId) {
        const user = await User.findByPk(req.session.userId);
        return res.status(200).json({
            user: {
                id: user.id,
                name: user.name,
            },
        });
    } else {
        return res.status(401).json({ user: null });
    }
});

router.post("/signup", async (req, res) => {
    const ps = await req.body.password;
    // Hash the password from the request
    const hashedPassword = await bcrypt.hash(ps, 10);

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
});

router.delete("/logout", (req, res) => {
    // Destroy session
    req.session.destroy((err) => {
        if (err) {
            return res.sendStatus(500);
        }

        // Clear cookie assigned to the client
        res.clearCookie("connect.sid");
        return res.status(200).json({ message: "Logged out successfuly." });
    });
});

router.post("/login", async (req, res) => {
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
});

module.exports = router;
