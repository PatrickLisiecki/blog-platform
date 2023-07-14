require("dotenv").config();
const express = require("express");
const session = require("express-session");
const app = express();
const port = 7777;

// Import controllers
const signUpController = require("./controllers/signUpController");
const logInController = require("./controllers/logInController");
const logOutController = require("./controllers/logOutController");
const getPostsController = require("./controllers/getPostsController");
const createPostController = require("./controllers/createPostController");

const authenticateUser = (req, res, next) => {
    if (!req.session.userId) {
        return res
            .status(401)
            .json({ message: "You must be logged in to view this page." });
    }
    next();
};

app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 3600000, // 1 hour
        },
    })
);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.originalUrl}`);
    res.on("finish", () => {
        // the 'finish' event will be emitted when the response is handed over to the OS
        console.log(`Response Status: ${res.statusCode}`);
    });
    next();
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/signup", signUpController);

app.post("/login", logInController);

app.delete("/logout", logOutController);

app.post("/posts", authenticateUser, createPostController);

app.get("/posts/:userId", authenticateUser, getPostsController);
