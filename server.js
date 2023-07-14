require("dotenv").config();
const express = require("express");
const app = express();
const port = 7777;

// Import controllers
const signUpController = require("./controllers/signUpController");

app.use(express.json());

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
