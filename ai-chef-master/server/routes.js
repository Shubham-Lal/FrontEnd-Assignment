const express = require("express");
const { login, register } = require("./controllers/user.js");

const routes = express.Router();

routes.get("/", (req, res) => {
    res.status(200).json({ success: true, msg: "Server running" });
});

// User login
routes.post("/api/login", login);

// User registration
routes.post("/api/register", register);

module.exports = routes;