const express = require("express");
const { Login, Signup } = require("./controllers/user.js");

const routes = express.Router();

routes.get("/", (req, res) => {
    res.status(200).json({ success: true, msg: "Server running" });
});

routes.post("/api/login", Login);

routes.post("/api/signup", Signup);

module.exports = routes;