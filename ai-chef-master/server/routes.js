const express = require("express");

const validateUser = require("./middlewares/validateUser.js");
const { Login, Signup, AutoLogin } = require("./controllers/user.js");

const routes = express.Router();

routes.get("/", (req, res) => {
    res.status(200).json({ success: true, msg: "Server running" });
});

routes.get("/api/auto-login", validateUser, AutoLogin);

routes.post("/api/login", Login);

routes.post("/api/signup", Signup);

module.exports = routes;