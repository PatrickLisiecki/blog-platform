require("dotenv").config();
const express = require("express");
const session = require("express-session");
const app = express();
const port = 7777;

// Import controllers for sign up, log in, and sign out
const signUpController = require("./controllers/signUpController");
const logInController = require("./controllers/logInController");
const logOutController = require("./controllers/logOutController");

// Import CRUD controllers for posts
const getPostsController = require("./controllers/getPostsController");
const createPostController = require("./controllers/createPostController");
const getPostByIdController = require("./controllers/getPostByIdController");
const updatePostController = require("./controllers/updatePostController");
const deletePostController = require("./controllers/deletePostController");

// Import CRUD controllers for comments
const getCommentsController = require("./controllers/getCommentsController");
const createCommentController = require("./controllers/createCommentController");
const getCommentByIdController = require("./controllers/getCommentByIdController");
const updateCommentController = require("./controllers/updateCommentController");
const deleteCommentController = require("./controllers/deleteCommentController");

const authenticateUser = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: "You must be logged in to view this page." });
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

// User sign up, log in, and log out routes
app.post("/signup", signUpController);
app.post("/login", logInController);
app.delete("/logout", logOutController);

// CRUD routes for posts
app.post("/posts", authenticateUser, createPostController);
app.get("/posts", authenticateUser, getPostsController);
app.get("/posts/:postId", authenticateUser, getPostByIdController);
app.patch("/posts/:postId", authenticateUser, updatePostController);
app.delete("/posts/:postId", authenticateUser, deletePostController);

// CRUD routes for comments
app.post("/posts/:postId/comments", authenticateUser, createCommentController);
app.get("/posts/:postId/comments", authenticateUser, getCommentsController);
app.get("/posts/:postId/comments/:commentId", authenticateUser, getCommentByIdController);
app.patch("/posts/:postId/comments/:commentId", authenticateUser, updateCommentController);
app.delete("/posts/:postId/comments/:commentId", authenticateUser, deleteCommentController);
